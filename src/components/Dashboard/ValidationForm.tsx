import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, FileText, Users, Shield } from "lucide-react";

export const ValidationForm = () => {
  const [formData, setFormData] = useState({
    thesisId: "",
    validationType: "",
    comments: "",
    approved: false,
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent, endpoint: string) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call different API endpoints based on validation type
      switch (endpoint) {
        case "mentor":
          await apiService.validateByMentor(formData);
          break;
        case "secretary":
          await apiService.validateBySecretary(formData);
          break;
        case "administration":
          await apiService.validateByAdministration(formData);
          break;
        case "commission":
          await apiService.validateByCommission(formData);
          break;
        default:
          throw new Error("Invalid validation type");
      }

      toast({
        title: "Success",
        description: "Validation completed successfully",
      });
      setFormData({
        thesisId: "",
        validationType: "",
        comments: "",
        approved: false,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to complete validation",
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Thesis Validation
          </CardTitle>
          <CardDescription>Review and validate thesis submissions at different stages</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="mentor" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="mentor">Mentor</TabsTrigger>
              <TabsTrigger value="secretary">Secretary</TabsTrigger>
              <TabsTrigger value="administration">Administration</TabsTrigger>
              <TabsTrigger value="commission">Commission</TabsTrigger>
            </TabsList>

            <TabsContent value="mentor">
              <form onSubmit={(e) => handleSubmit(e, "mentor")} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="thesisId">Thesis ID</Label>
                    <Input
                      id="thesisId"
                      name="thesisId"
                      value={formData.thesisId}
                      onChange={handleChange}
                      placeholder="Enter thesis ID"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="validationType">Validation Status</Label>
                    <Select onValueChange={(value) => setFormData({...formData, validationType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="needs-revision">Needs Revision</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="comments">Comments</Label>
                  <Textarea
                    id="comments"
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    placeholder="Provide feedback and comments"
                    rows={4}
                    required
                  />
                </div>
                
                <Button type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Mentor Validation"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="secretary">
              <form onSubmit={(e) => handleSubmit(e, "secretary")} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="thesisId">Thesis ID</Label>
                    <Input
                      id="thesisId"
                      name="thesisId"
                      value={formData.thesisId}
                      onChange={handleChange}
                      placeholder="Enter thesis ID"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="validationType">Secretary Phase</Label>
                    <Select onValueChange={(value) => setFormData({...formData, validationType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select phase" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="first">First Phase</SelectItem>
                        <SelectItem value="second">Second Phase</SelectItem>
                        <SelectItem value="third">Third Phase</SelectItem>
                        <SelectItem value="fourth">Fourth Phase</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="comments">Secretary Comments</Label>
                  <Textarea
                    id="comments"
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    placeholder="Secretary validation notes"
                    rows={4}
                    required
                  />
                </div>
                
                <Button type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Secretary Validation"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="administration">
              <form onSubmit={(e) => handleSubmit(e, "administration")} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="thesisId">Thesis ID</Label>
                    <Input
                      id="thesisId"
                      name="thesisId"
                      value={formData.thesisId}
                      onChange={handleChange}
                      placeholder="Enter thesis ID"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="validationType">Administrative Decision</Label>
                    <Select onValueChange={(value) => setFormData({...formData, validationType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select decision" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="pending">Pending Review</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="comments">Administrative Notes</Label>
                  <Textarea
                    id="comments"
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    placeholder="Administrative validation comments"
                    rows={4}
                    required
                  />
                </div>
                
                <Button type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Administrative Validation"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="commission">
              <form onSubmit={(e) => handleSubmit(e, "commission")} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="thesisId">Thesis ID</Label>
                    <Input
                      id="thesisId"
                      name="thesisId"
                      value={formData.thesisId}
                      onChange={handleChange}
                      placeholder="Enter thesis ID"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="validationType">Commission Decision</Label>
                    <Select onValueChange={(value) => setFormData({...formData, validationType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select decision" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="conditional">Conditional Approval</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="comments">Commission Report</Label>
                  <Textarea
                    id="comments"
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    placeholder="Detailed commission evaluation and recommendations"
                    rows={6}
                    required
                  />
                </div>
                
                <Button type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Commission Validation"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Validation Status Overview</CardTitle>
          <CardDescription>Track validation progress across all stages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-4 p-4 border rounded-lg">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm font-medium">Mentor Reviews</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 border rounded-lg">
              <Shield className="h-8 w-8 text-secondary" />
              <div>
                <p className="text-sm font-medium">Secretary Reviews</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 border rounded-lg">
              <CheckCircle className="h-8 w-8 text-accent" />
              <div>
                <p className="text-sm font-medium">Admin Reviews</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 border rounded-lg">
              <Users className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Commission Reviews</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};