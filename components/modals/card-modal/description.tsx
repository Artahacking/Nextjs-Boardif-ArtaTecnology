"use client";

import { toast } from "sonner";
import { AlignLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { useState, useRef, ElementRef, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";
import { CardWithList } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { FormTextarea } from "@/components/form/form-textarea";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";

interface ChatMessage {
  id: number;
  text: string;
}

interface DescriptionProps {
  data: CardWithList;
}

export const Description = ({ data }: DescriptionProps) => {
  const params = useParams();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const [editingMessageText, setEditingMessageText] = useState("");

  const formRef = useRef<ElementRef<"form">>(null);
  const textareaRef = useRef<ElementRef<"textarea">>(null);

  useEffect(() => {
    const storedMessages = localStorage.getItem("chatMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const { execute, FieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      toast.success(`Card "${data.title}" updated`);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const description = formData.get("description") as string;
    const boardId = params.boardId as string;

    execute({
      id: data.id,
      description,
      boardId,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const downloadFile = () => {
    if (file) {
      const url = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    const message = { id: Date.now(), text: newMessage };
    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    setNewMessage("");
    localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
  };

  const handleEditMessage = (id: number, text: string) => {
    setEditingMessageId(id);
    setEditingMessageText(text);
  };

  const handleUpdateMessage = () => {
    if (editingMessageId === null || editingMessageText.trim() === "") return;
    const updatedMessages = messages.map((msg) =>
      msg.id === editingMessageId ? { ...msg, text: editingMessageText } : msg
    );
    setMessages(updatedMessages);
    setEditingMessageId(null);
    setEditingMessageText("");
    localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
  };

  const handleDeleteMessage = (id: number) => {
    const updatedMessages = messages.filter((msg) => msg.id !== id);
    setMessages(updatedMessages);
    localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-x-3 w-full">
        <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />
        <div className="w-full">
          <p className="font-semibold text-neutral-700 mb-2">Description</p>
          {isEditing ? (
            <form action={onSubmit} ref={formRef} className="space-y-2">
              <FormTextarea
                id="description"
                className="w-full mt-2"
                placeholder="Add a more detailed description"
                defaultValue={data.description || undefined}
                errors={FieldErrors}
                ref={textareaRef}
              />
              <div className="flex items-center gap-x-2">
                <FormSubmit className="bg-blue-500 text-white hover:bg-blue-600 transition">
                  Save
                </FormSubmit>
                <Button
                  className="bg-gray-500 text-white hover:bg-gray-600 transition"
                  onClick={disableEditing}
                >
                  Cancel
                </Button>
              </div>
              <input type="file" onChange={handleFileUpload} />
              {file && (
                <div className="flex justify-between mt-2">
                  <p>{file.name}</p>
                  <Button
                    className="bg-green-500 text-white hover:bg-green-600 transition"
                    onClick={downloadFile}
                  >
                    Download
                  </Button>
                </div>
              )}
            </form>
          ) : (
            <div
              onClick={enableEditing}
              role="button"
              className="min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md cursor-pointer"
            >
              {data.description || "Add a more detailed description..."}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="border rounded-md p-2"
        />
        <Button
          className="bg-blue-500 text-white hover:bg-blue-600 transition mt-2"
          onClick={handleSendMessage}
        >
          Send
        </Button>
        <div className="mt-4">
          {messages.map((msg) => (
            <div key={msg.id} className="flex justify-between items-center mb-2">
              {editingMessageId === msg.id ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={editingMessageText}
                    onChange={(e) => setEditingMessageText(e.target.value)}
                    className="border rounded-md p-1 flex-grow"
                  />
                  <Button
                    className="bg-blue-500 text-white hover:bg-blue-600 transition"
                    onClick={handleUpdateMessage}
                  >
                    Update
                  </Button>
                  <Button
                    className="bg-gray-500 text-white hover:bg-gray-600 transition"
                    onClick={() => setEditingMessageId(null)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <p className="flex-grow">{msg.text}</p>
              )}
              <div className="flex space-x-2">
                <Button
                  className="bg-yellow-500 text-white hover:bg-yellow-600 transition"
                  onClick={() => handleEditMessage(msg.id, msg.text)}
                >
                  Edit
                </Button>
                <Button
                  className="bg-red-500 text-white hover:bg-red-600 transition"
                  onClick={() => handleDeleteMessage(msg.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
        <Skeleton className="w-full h-[78px] bg-neutral-200" />
      </div>
    </div>
  );
};
