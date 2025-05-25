"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

export function CatalogFilters() {
  const [showAllParams, setShowAllParams] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<'equipment' | 'parts'>('equipment');

  return (
    <div className="space-y-6">
      {/* Поиск по словам */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-10"
          placeholder="Поиск по объявлениям"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="bg-card p-6 rounded-lg shadow-sm border space-y-6">
        {/* Выбор категории */}
        <div className="space-y-2">
          <Label>Категория</Label>
          <Select value={category} onValueChange={(value: 'equipment' | 'parts') => setCategory(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите категорию" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="equipment">Техника</SelectItem>
              <SelectItem value="parts">Запчасти</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Основные фильтры для техники */}
        {category === 'equipment' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Вид техники</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите вид" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excavator">Экскаваторы</SelectItem>
                  <SelectItem value="bulldozer">Бульдозеры</SelectItem>
                  <SelectItem value="loader">Погрузчики</SelectItem>
                  <SelectItem value="crane">Краны</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Тип техники</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите тип" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wheeled">Колесная</SelectItem>
                  <SelectItem value="tracked">Гусеничная</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Марка</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите марку" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cat">Caterpillar</SelectItem>
                  <SelectItem value="komatsu">Komatsu</SelectItem>
                  <SelectItem value="hitachi">Hitachi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Модель</Label>
              <Input placeholder="Введите модель" />
            </div>

            <div className="space-y-2">
              <Label>Год выпуска</Label>
              <div className="flex gap-2">
                <Input placeholder="от" type="number" />
                <Input placeholder="до" type="number" />
              </div>
            </div>
          </div>
        )}

        {/* Основные фильтры для запчастей */}
        {category === 'parts' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Вид техники</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите вид" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excavator">Экскаваторы</SelectItem>
                  <SelectItem value="bulldozer">Бульдозеры</SelectItem>
                  <SelectItem value="loader">Погрузчики</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Марка техники</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите марку" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cat">Caterpillar</SelectItem>
                  <SelectItem value="komatsu">Komatsu</SelectItem>
                  <SelectItem value="hitachi">Hitachi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Модель техники</Label>
              <Input placeholder="Введите модель" />
            </div>

            <div className="space-y-2">
              <Label>Наименование</Label>
              <Input placeholder="Введите наименование" />
            </div>

            <div className="space-y-2">
              <Label>Номер/артикул</Label>
              <Input placeholder="Введите номер или артикул" />
            </div>

            <div className="space-y-2">
              <Label>Часть/система техники</Label>
              <Select>
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
          </div>
        )}

        {/* Кнопка "Все параметры" */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setShowAllParams(!showAllParams)}
        >
          {showAllParams ? (
            <>
              Скрыть параметры
              <ChevronUp className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Все параметры
              <ChevronDown className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>

        {/* Дополнительные параметры */}
        {showAllParams && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Состояние</Label>
                <Select>
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
                <Label>Условия оплаты</Label>
                <Select>
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
                <Label>Валюта</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите валюту" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RUB">₽</SelectItem>
                    <SelectItem value="USD">$</SelectItem>
                    <SelectItem value="BYN">BYN</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Цена</Label>
                <div className="flex gap-2">
                  <Input placeholder="от" type="number" />
                  <Input placeholder="до" type="number" />
                </div>
              </div>
            </div>

            {/* Местоположение */}
            <div className="space-y-4">
              <h3 className="font-medium">Местоположение</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Страна" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ru">Россия</SelectItem>
                    <SelectItem value="by">Беларусь</SelectItem>
                  </SelectContent>
                </Select>

                <Input placeholder="Область" />
                <Input placeholder="Город" />
              </div>
            </div>

            {/* Дополнительные опции */}
            <div className="space-y-4">
              <h3 className="font-medium">Дополнительно</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="delivery" />
                  <Label htmlFor="delivery">Доставка</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="inspection" />
                  <Label htmlFor="inspection">Возможность проверки</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="withPhotos" />
                  <Label htmlFor="withPhotos">Только с фото</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="withVideo" />
                  <Label htmlFor="withVideo">Только с видео</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="withManual" />
                  <Label htmlFor="withManual">С инструкцией</Label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Кнопки управления */}
        <div className="flex justify-end gap-4 pt-4">
          <Button variant="outline">Сбросить</Button>
          <Button>Показать результаты</Button>
        </div>
      </div>
    </div>
  );
}