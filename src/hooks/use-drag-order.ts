import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { arrayMove } from "@dnd-kit/sortable";

interface UseDragOrderProps<T> {
  items: T[] | undefined;
  tableName: 'skills' | 'testimonials';
  refetch: () => void;
}

export const useDragOrder = <T extends { id: string }>({ 
  items, 
  tableName,
  refetch 
}: UseDragOrderProps<T>) => {
  const { toast } = useToast();

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    
    if (!active || !over || active.id === over.id || !items) {
      return;
    }

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);

    if (oldIndex === undefined || newIndex === undefined) {
      return;
    }

    const newItems = arrayMove(items, oldIndex, newIndex);
    
    const updatePromises = newItems.map((item, index) => 
      supabase
        .from(tableName)
        .update({ display_order: index })
        .eq('id', item.id)
    );

    try {
      const results = await Promise.all(updatePromises);
      const errors = results.filter(result => result.error);
      
      if (errors.length > 0) {
        console.error(`Errors updating ${tableName} order:`, errors);
        toast({
          title: "Error",
          description: `Failed to update ${tableName} order`,
          variant: "destructive",
        });
        return;
      }

      refetch();
      toast({
        title: "Success",
        description: `${tableName.charAt(0).toUpperCase() + tableName.slice(1)} order updated successfully`,
      });
    } catch (error) {
      console.error(`Error updating ${tableName} order:`, error);
      toast({
        title: "Error",
        description: `Failed to update ${tableName} order`,
        variant: "destructive",
      });
    }
  };

  return { handleDragEnd };
};