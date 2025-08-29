import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { apiService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

export const ThesisSubmissionForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    studentName: "",
    mentorName: "",
    department: "",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiService.submitThesis(formData);
      toast({
        title: "Success",
        description: "Thesis submitted successfully",
      });
      setFormData({
        title: "",
        description: "",
        studentName: "",
        mentorName: "",
        department: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit thesis",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit New Thesis</CardTitle>
        <CardDescription>Fill in the details to submit a new master thesis</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Thesis Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentName">Student Name</Label>
              <Input
                id="studentName"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mentorName">Mentor Name</Label>
              <Input
                id="mentorName"
                name="mentorName"
                value={formData.mentorName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>
          
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Thesis"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};