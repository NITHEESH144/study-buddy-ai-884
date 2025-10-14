import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const FileUpload = ({ userId }: { userId: string }) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, category: "notes" | "question_paper") => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const filePath = `${userId}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage.from("study-materials").upload(filePath, file);
      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase.from("uploaded_files").insert({
        user_id: userId,
        file_name: file.name,
        file_type: file.type,
        file_category: category,
        storage_path: filePath,
        file_size: file.size
      });
      if (dbError) throw dbError;

      toast({ title: "File uploaded successfully!", description: "AI analysis will begin shortly" });
    } catch (error: any) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="hover:shadow-lg transition-all">
        <CardContent className="p-8">
          <div className="flex flex-col items-center text-center">
            <FileText className="mb-4 h-16 w-16 text-primary" />
            <h3 className="mb-2 text-xl font-semibold">Upload Notes</h3>
            <p className="mb-6 text-sm text-muted-foreground">PDF or images of your study materials</p>
            <label>
              <input type="file" className="hidden" accept=".pdf,image/*" onChange={(e) => handleFileUpload(e, "notes")} disabled={uploading} />
              <Button disabled={uploading} asChild>
                <span>
                  {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                  Upload Notes
                </span>
              </Button>
            </label>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-all">
        <CardContent className="p-8">
          <div className="flex flex-col items-center text-center">
            <FileText className="mb-4 h-16 w-16 text-secondary" />
            <h3 className="mb-2 text-xl font-semibold">Upload Question Papers</h3>
            <p className="mb-6 text-sm text-muted-foreground">Previous year papers for analysis</p>
            <label>
              <input type="file" className="hidden" accept=".pdf,image/*" onChange={(e) => handleFileUpload(e, "question_paper")} disabled={uploading} />
              <Button disabled={uploading} variant="secondary" asChild>
                <span>
                  {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                  Upload Papers
                </span>
              </Button>
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FileUpload;
