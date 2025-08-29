import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Upload, FileCheck, Calendar, Archive, Users } from "lucide-react";
import { ThesisSubmissionForm } from "./ThesisSubmissionForm";
import { ThesisTable } from "./ThesisTable";
import { DefenseSchedulingForm } from "./DefenseSchedulingForm";
import { ValidationForm } from "./ValidationForm";

export const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Master Thesis Management</h2>
        <p className="text-muted-foreground">Manage thesis submissions, validations, and defenses</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
          <TabsTrigger value="validations">Validations</TabsTrigger>
          <TabsTrigger value="defenses">Defenses</TabsTrigger>
          <TabsTrigger value="archive">Archive</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Validations</CardTitle>
                <FileCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Awaiting review</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Scheduled Defenses</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Archived</CardTitle>
                <Archive className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">Total completed</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest thesis submissions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New thesis submitted</p>
                      <p className="text-xs text-muted-foreground">John Doe - 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Validation completed</p>
                      <p className="text-xs text-muted-foreground">Jane Smith - 4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Defense scheduled</p>
                      <p className="text-xs text-muted-foreground">Mike Johnson - 1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and operations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start">
                  <Upload className="h-4 w-4 mr-2" />
                  Submit New Thesis
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileCheck className="h-4 w-4 mr-2" />
                  Review Validations
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Defense
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Assign Commission
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="submissions">
          <div className="space-y-6">
            <ThesisSubmissionForm />
            <ThesisTable />
          </div>
        </TabsContent>

        <TabsContent value="validations">
          <ValidationForm />
        </TabsContent>

        <TabsContent value="defenses">
          <DefenseSchedulingForm />
        </TabsContent>

        <TabsContent value="archive">
          <Card>
            <CardHeader>
              <CardTitle>Archived Theses</CardTitle>
              <CardDescription>View and manage completed theses</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Archive functionality will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reports & Analytics</CardTitle>
              <CardDescription>View system reports and statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Reports functionality will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};