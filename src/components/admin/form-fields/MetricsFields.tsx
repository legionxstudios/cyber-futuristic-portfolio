import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface MetricsFieldsProps {
  form: UseFormReturn<any>;
}

export const MetricsFields = ({ form }: MetricsFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="traffic_heading"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Traffic Section Heading</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Traffic Growth"
                  className="bg-cyberdark border-cyberblue"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="visitors_heading"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Visitors Section Heading</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Visitor Engagement"
                  className="bg-cyberdark border-cyberblue"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="leads_heading"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Leads Section Heading</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Lead Generation"
                  className="bg-cyberdark border-cyberblue"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="budget_heading"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget Section Heading</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Budget Efficiency"
                  className="bg-cyberdark border-cyberblue"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="traffic_initial"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Initial Traffic</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  className="bg-cyberdark border-cyberblue"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="traffic_final"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Final Traffic</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  className="bg-cyberdark border-cyberblue"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="unique_visitors"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Unique Visitors</FormLabel>
            <FormControl>
              <Input {...field} className="bg-cyberdark border-cyberblue" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="lead_generation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Lead Generation</FormLabel>
            <FormControl>
              <Input {...field} className="bg-cyberdark border-cyberblue" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="budget_efficiency"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Budget Efficiency</FormLabel>
            <FormControl>
              <Input {...field} className="bg-cyberdark border-cyberblue" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};