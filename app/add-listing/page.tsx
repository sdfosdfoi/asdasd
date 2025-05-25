"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

interface ListingForm {
  type: 'buy' | 'sell';
  category: 'equipment' | 'parts';
  equipmentType?: string;
  brand?: string;
  model?: string;
  year?: number;
  condition?: string;
  paymentTerms?: string;
  location: {
    country: string;
    region: string;
    city: string;
  };
  delivery?: boolean;
  inspection?: boolean;
  description?: string;
  price: {
    amount: number;
    currency: 'RUB' | 'USD' | 'BYN';
  };
  media: {
    photos: File[];
    video?: string;
    manual?: File;
  };
  // Дополнительные поля для запчастей
  partName?: string;
  originalNumber?: string;
  alternativeNumber?: string;
  systemPart?: string;
  partGroup?: string;
}

const initialForm: ListingForm = {
  type: 'sell',
  category: 'equipment',
  location: {
    country: '',
    region: '',
    city: ''
  },
  price: {
    amount: 0,
    currency: 'RUB'
  },
  media: {
    photos: []
  }
};

export default function AddListingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [form, setForm] = useState<ListingForm>(initialForm);
  const router = useRouter();

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
    if (!authStatus) {
      router.push('/auth?redirect=/add-listing');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Здесь будет логика отправки данных на сервер
      console.log(form);
      toast.success("Объявление успешно создано");
      router.push('/profile');
    } catch (error) {
      toast.error("Ошибка при создании объявления");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'photos' | 'manual') => {
    const files = e.target.files;
    if (files) {
      if (type === 'photos' && files.length > 10) {
        toast.error("Максимальное количество фотографий - 10");
        return;
      }
      setForm(prev => ({
        ...prev,
        media: {
          ...prev.media,
          [type]: type === 'photos' ? Array.from(files) : files[0]
        }
      }));
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container max-w-2xl py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Новое объявление</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Тип объявления</Label>
              <RadioGroup
                value={form.type}
                onValueChange={(value: 'buy' | 'sell') => 
                  setForm(prev => ({ ...prev, type: value }))}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="buy" id="buy" />
                  <Label htmlFor="buy">Покупка</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sell" id="sell" />
                  <Label htmlFor="sell">Продажа</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Раздел</Label>
              <RadioGroup
                value={form.category}
                onValueChange={(value: 'equipment' | 'parts') => 
                  setForm(prev => ({ ...prev, category: value }))}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="equipment" id="equipment" />
                  <Label htmlFor="equipment">Техника</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="parts" id="parts" />
                  <Label htmlFor="parts">Запчасти</Label>
                </div>
              </RadioGroup>
            </div>

            {form.category === 'equipment' ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="equipmentType">Вид техники*</Label>
                  <Select
                    value={form.equipmentType}
                    onValueChange={(value) => 
                      setForm(prev => ({ ...prev, equipmentType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите вид техники" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excavator">Экскаватор</SelectItem>
                      <SelectItem value="bulldozer">Бульдозер</SelectItem>
                      <SelectItem value="loader">Погрузчик</SelectItem>
                      <SelectItem value="crane">Кран</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brand">Марка*</Label>
                  <Select
                    value={form.brand}
                    onValueChange={(value) => 
                      setForm(prev => ({ ...prev, brand: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите марку" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="caterpillar">Caterpillar</SelectItem>
                      <SelectItem value="komatsu">Komatsu</SelectItem>
                      <SelectItem value="hitachi">Hitachi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model">Модель*</Label>
                  <Input 
                    id="model"
                    value={form.model}
                    onChange={(e) => setForm(prev => ({ ...prev, model: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Год выпуска*</Label>
                  <Input 
                    id="year"
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                    value={form.year}
                    onChange={(e) => setForm(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="partName">Наименование*</Label>
                  <Input 
                    id="partName"
                    value={form.partName}
                    onChange={(e) => setForm(prev => ({ ...prev, partName: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="originalNumber">Оригинальный номер / артикул</Label>
                  <Input 
                    id="originalNumber"
                    value={form.originalNumber}
                    onChange={(e) => setForm(prev => ({ ...prev, originalNumber: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alternativeNumber">Альтернативный номер / артикул</Label>
                  <Input 
                    id="alternativeNumber"
                    value={form.alternativeNumber}
                    onChange={(e) => setForm(prev => ({ ...prev, alternativeNumber: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="systemPart">Часть / система техники*</Label>
                  <Select
                    value={form.systemPart}
                    onValueChange={(value) => 
                      setForm(prev => ({ ...prev, systemPart: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите систему" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engine">Двигатель</SelectItem>
                      <SelectItem value="transmission">Трансмиссия</SelectItem>
                      <SelectItem value="hydraulics">Гидравлика</SelectItem>
                      <SelectItem value="electrical">Электрика</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="condition">Состояние*</Label>
              <Select
                value={form.condition}
                onValueChange={(value) => 
                  setForm(prev => ({ ...prev, condition: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите состояние" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">Новое</SelectItem>
                  <SelectItem value="used-working">Б/У, исправное</SelectItem>
                  <SelectItem value="used-functional">Б/У, работоспособное</SelectItem>
                  <SelectItem value="used-repair">Б/У, требует ремонта</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentTerms">Условия оплаты*</Label>
              <Select
                value={form.paymentTerms}
                onValueChange={(value) => 
                  setForm(prev => ({ ...prev, paymentTerms: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите условия" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Полная предоплата</SelectItem>
                  <SelectItem value="partial">Частичная предоплата</SelectItem>
                  <SelectItem value="ondelivery">По факту получения</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Местонахождение*</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select
                  value={form.location.country}
                  onValueChange={(value) => 
                    setForm(prev => ({ 
                      ...prev, 
                      location: { ...prev.location, country: value }
                    }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Страна" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ru">Россия</SelectItem>
                    <SelectItem value="by">Беларусь</SelectItem>
                  </SelectContent>
                </Select>

                <Input 
                  placeholder="Область"
                  value={form.location.region}
                  onChange={(e) => setForm(prev => ({ 
                    ...prev, 
                    location: { ...prev.location, region: e.target.value }
                  }))}
                  required
                />

                <Input 
                  placeholder="Город"
                  value={form.location.city}
                  onChange={(e) => setForm(prev => ({ 
                    ...prev, 
                    location: { ...prev.location, city: e.target.value }
                  }))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Стоимость*</Label>
              <div className="flex gap-4">
                <Input 
                  type="number"
                  placeholder="Сумма"
                  value={form.price.amount || ''}
                  onChange={(e) => setForm(prev => ({ 
                    ...prev, 
                    price: { ...prev.price, amount: parseInt(e.target.value) }
                  }))}
                  required
                  className="flex-1"
                />
                <Select
                  value={form.price.currency}
                  onValueChange={(value: 'RUB' | 'USD' | 'BYN') => 
                    setForm(prev => ({ 
                      ...prev, 
                      price: { ...prev.price, currency: value }
                    }))}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RUB">₽</SelectItem>
                    <SelectItem value="USD">$</SelectItem>
                    <SelectItem value="BYN">BYN</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Описание</Label>
              <Textarea 
                id="description"
                value={form.description}
                onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                rows={5}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photos">Фотографии*</Label>
              <Input 
                id="photos"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileChange(e, 'photos')}
                required
              />
              <p className="text-sm text-muted-foreground">Максимум 10 фотографий</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="video">Ссылка на видео (YouTube)</Label>
              <Input 
                id="video"
                type="url"
                placeholder="https://youtube.com/..."
                value={form.media.video}
                onChange={(e) => setForm(prev => ({ 
                  ...prev, 
                  media: { ...prev.media, video: e.target.value }
                }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="manual">Инструкция (PDF)</Label>
              <Input 
                id="manual"
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(e, 'manual')}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Публикация..." : "Опубликовать объявление"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}