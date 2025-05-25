import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EquipmentDirectory } from "@/components/admin/references/equipment-directory";
import { PartsDirectory } from "@/components/admin/references/parts-directory";
import { ListingTypes } from "@/components/admin/references/listing-types";
import { DeliveryOptions } from "@/components/admin/references/delivery-options";
import { Conditions } from "@/components/admin/references/conditions";
import { PaymentTerms } from "@/components/admin/references/payment-terms";
import { InspectionOptions } from "@/components/admin/references/inspection-options";

export default function ReferencesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Справочники</h1>
      
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="equipment">
            <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <TabsTrigger value="equipment">Техника</TabsTrigger>
              <TabsTrigger value="parts">Запчасти</TabsTrigger>
              <TabsTrigger value="listings">Объявления</TabsTrigger>
              <TabsTrigger value="other">Прочее</TabsTrigger>
            </TabsList>
            
            <TabsContent value="equipment" className="mt-6">
              <EquipmentDirectory />
            </TabsContent>
            
            <TabsContent value="parts" className="mt-6">
              <PartsDirectory />
            </TabsContent>
            
            <TabsContent value="listings" className="mt-6">
              <ListingTypes />
            </TabsContent>
            
            <TabsContent value="other" className="mt-6">
              <div className="grid gap-6">
                <DeliveryOptions />
                <Conditions />
                <PaymentTerms />
                <InspectionOptions />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}