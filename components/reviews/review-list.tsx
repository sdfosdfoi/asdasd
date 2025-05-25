"use client";

import { useState, useEffect } from "react";
import { ReviewCard } from "./review-card";
import { FileText } from "lucide-react";

export function ReviewList() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Here we'll fetch reviews from the database
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Загрузка отзывов...</div>;
  }

  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8">
        <FileText className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">Отзывов пока нет</h3>
        <p className="text-muted-foreground">
          У продавца еще нет отзывов от покупателей
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} {...review} />
      ))}
    </div>
  );
}