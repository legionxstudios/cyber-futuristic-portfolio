import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Plus, Trash2 } from "lucide-react";

export const BusinessSettingsManager = () => {
  const [newBusinessType, setNewBusinessType] = useState("");
  const [newIndustry, setNewIndustry] = useState("");
  const [newChannel, setNewChannel] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: businessTypes, isLoading: loadingBusinessTypes } = useQuery({
    queryKey: ["businessTypes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("business_types")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  const { data: industries, isLoading: loadingIndustries } = useQuery({
    queryKey: ["industries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("industries")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  const { data: channels, isLoading: loadingChannels } = useQuery({
    queryKey: ["channels"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("channels")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  const addBusinessType = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("business_types")
        .insert([{ name: newBusinessType }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businessTypes"] });
      setNewBusinessType("");
      toast({
        title: "Success",
        description: "Business type added successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const addIndustry = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("industries")
        .insert([{ name: newIndustry }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["industries"] });
      setNewIndustry("");
      toast({
        title: "Success",
        description: "Industry added successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const addChannel = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("channels")
        .insert([{ name: newChannel }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["channels"] });
      setNewChannel("");
      toast({
        title: "Success",
        description: "Channel added successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteBusinessType = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("business_types")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businessTypes"] });
      toast({
        title: "Success",
        description: "Business type deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteIndustry = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("industries").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["industries"] });
      toast({
        title: "Success",
        description: "Industry deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteChannel = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("channels").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["channels"] });
      toast({
        title: "Success",
        description: "Channel deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-cyberpink">Business Types</h2>
        <div className="flex gap-2">
          <Input
            placeholder="Add new business type..."
            value={newBusinessType}
            onChange={(e) => setNewBusinessType(e.target.value)}
            className="bg-cyberdark border-cyberblue"
          />
          <Button
            onClick={() => addBusinessType.mutate()}
            disabled={!newBusinessType || addBusinessType.isPending}
            className="bg-cyberpink hover:bg-cyberpink/80"
          >
            {addBusinessType.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            Add
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loadingBusinessTypes ? (
              <TableRow>
                <TableCell colSpan={2} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              businessTypes?.map((type) => (
                <TableRow key={type.id}>
                  <TableCell>{type.name}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => deleteBusinessType.mutate(type.id)}
                      className="hover:text-red-500 hover:border-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-cyberpink">Industries</h2>
        <div className="flex gap-2">
          <Input
            placeholder="Add new industry..."
            value={newIndustry}
            onChange={(e) => setNewIndustry(e.target.value)}
            className="bg-cyberdark border-cyberblue"
          />
          <Button
            onClick={() => addIndustry.mutate()}
            disabled={!newIndustry || addIndustry.isPending}
            className="bg-cyberpink hover:bg-cyberpink/80"
          >
            {addIndustry.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            Add
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loadingIndustries ? (
              <TableRow>
                <TableCell colSpan={2} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              industries?.map((industry) => (
                <TableRow key={industry.id}>
                  <TableCell>{industry.name}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => deleteIndustry.mutate(industry.id)}
                      className="hover:text-red-500 hover:border-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-cyberpink">Channels</h2>
        <div className="flex gap-2">
          <Input
            placeholder="Add new channel..."
            value={newChannel}
            onChange={(e) => setNewChannel(e.target.value)}
            className="bg-cyberdark border-cyberblue"
          />
          <Button
            onClick={() => addChannel.mutate()}
            disabled={!newChannel || addChannel.isPending}
            className="bg-cyberpink hover:bg-cyberpink/80"
          >
            {addChannel.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            Add
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loadingChannels ? (
              <TableRow>
                <TableCell colSpan={2} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              channels?.map((channel) => (
                <TableRow key={channel.id}>
                  <TableCell>{channel.name}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => deleteChannel.mutate(channel.id)}
                      className="hover:text-red-500 hover:border-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};