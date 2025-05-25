"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { toast } from "sonner";

interface ReviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  sellerId: string;
  conversationId: string;
}

export function ReviewDialog({ isOpen, onClose, sellerId, conversationId }: ReviewDialogProps) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Пожалуйста, укажите оценку");
      return;
    }

    if (!review.trim()) {
      toast.error("Пожалуйста, напишите отзыв");
      return;
    }

    setIsSubmitting(true);

    try {
      // Here we'll send the review to the database
      toast.success("Спасибо за ваш отзыв!");
      onClose();
    } catch (error) {
      toast.error("Не удалось отправить отзыв");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Оставить отзыв о продавце</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onClick={() => setRating(value)}
                className="focus:outline-none"
              >
                <Star
                  className={`h-8 w-8 ${
                    value <= rating
                      ? "fill-primary text-primary"
                      : "fill-muted text-muted"
                  }`}
                />
              </button>
            ))}
          </div>

          <Textarea
            placeholder="Расскажите о вашем опыте работы с продавцом"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={4}
          />

          <Button 
            className="w-full" 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Отправка..." : "Отправить отзыв"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}