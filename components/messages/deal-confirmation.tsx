"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReviewDialog } from "@/components/reviews/review-dialog";
import { toast } from "sonner";

interface DealConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  sellerId: string;
  conversationId: string;
}

export function DealConfirmation({ isOpen, onClose, sellerId, conversationId }: DealConfirmationProps) {
  const [showReviewDialog, setShowReviewDialog] = useState(false);

  const handleDealConfirm = async (confirmed: boolean) => {
    try {
      // Here we'll update the deal status in the database
      if (confirmed) {
        setShowReviewDialog(true);
      }
      onClose();
    } catch (error) {
      toast.error("Произошла ошибка");
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Подтверждение сделки</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 pt-4">
            <p className="text-center text-muted-foreground">
              Состоялась ли сделка с продавцом?
            </p>
            
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => handleDealConfirm(false)}>
                Нет
              </Button>
              <Button onClick={() => handleDealConfirm(true)}>
                Да
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ReviewDialog
        isOpen={showReviewDialog}
        onClose={() => setShowReviewDialog(false)}
        sellerId={sellerId}
        conversationId={conversationId}
      />
    </>
  );
}