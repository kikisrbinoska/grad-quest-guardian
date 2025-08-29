import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { apiService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

export const DefenseSchedulingForm = () => {
  const [formData, setFormData] = useState({
    thesisId: "",
    date: "",
    time: "",
    location: "",
    commissionMembers: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiService.scheduleDefense(formData);
      toast({
        title: "Success",
        description: "Defense scheduled successfully",
      });
      setFormData({
        thesisId: "",
        date: "",
        time: "",
        location: "",
        commissionMembers: "",
        notes: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule defense",
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
            <Calendar className="h-5 w-5" />
            Schedule Defense
          </CardTitle>
          <CardDescription>Set up defense date, time, and commission details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
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
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Room/Building"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Time
                </Label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="commissionMembers" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Commission Members
              </Label>
              <Textarea
                id="commissionMembers"
                name="commissionMembers"
                value={formData.commissionMembers}
                onChange={handleChange}
                placeholder="List commission member names (one per line)"
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any special requirements or notes"
                rows={3}
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Scheduling..." : "Schedule Defense"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Defenses</CardTitle>
          <CardDescription>Recently scheduled defense sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold">Machine Learning in Healthcare</h4>
                <span className="text-sm text-muted-foreground">Thesis #001</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  March 15, 2024
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  14:00
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Room 301
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  3 members
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold">Blockchain in Supply Chain</h4>
                <span className="text-sm text-muted-foreground">Thesis #002</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  March 18, 2024
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  10:00
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Room 205
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  3 members
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};