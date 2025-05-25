import { CatalogFilters } from "@/components/catalog/catalog-filters";
import { CatalogListings } from "@/components/catalog/catalog-listings";
import { CatalogSort } from "@/components/catalog/catalog-sort";
import { Breadcrumbs } from "@/components/catalog/breadcrumbs";

export default function CatalogPage() {
  return (
    <div className="container py-6 px-8">
      <Breadcrumbs 
        items={[
          { title: "Главная", href: "/" },
          { title: "Каталог", href: "/katalog" },
        ]} 
      />
      
      <div className="mt-4 mb-6">
        <h1 className="text-3xl font-bold">Каталог спецтехники и запчастей</h1>
        <p className="text-muted-foreground mt-2">
          Найдено 6349 объявлений
        </p>
      </div>
      
      <CatalogFilters />
      
      <div className="mt-6 flex flex-col md:flex-row justify-between items-start gap-4">
        <CatalogSort />
      </div>
      
      <CatalogListings />
    </div>
  );
}