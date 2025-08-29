import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Eye, Edit, Trash2 } from "lucide-react";

// Mock data - replace with real API call
const mockTheses = [
  {
    id: 1,
    title: "Machine Learning Applications in Healthcare",
    student: "John Doe",
    mentor: "Dr. Smith",
    status: "Under Review",
    submittedDate: "2024-01-15",
    department: "Computer Science",
  },
  {
    id: 2,
    title: "Blockchain Technology in Supply Chain",
    student: "Jane Smith",
    mentor: "Dr. Johnson",
    status: "Approved",
    submittedDate: "2024-01-10",
    department: "Information Systems",
  },
  {
    id: 3,
    title: "AI Ethics and Social Impact",
    student: "Mike Johnson",
    mentor: "Dr. Brown",
    status: "Pending",
    submittedDate: "2024-01-20",
    department: "Computer Science",
  },
];

export const ThesisTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filteredTheses = mockTheses.filter((thesis) => {
    const matchesSearch = thesis.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         thesis.student.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterStatus || thesis.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Under Review":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Pending":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thesis Management</CardTitle>
        <CardDescription>View and manage all thesis submissions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title or student name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background text-foreground"
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Under Review">Under Review</option>
              <option value="Approved">Approved</option>
            </select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Mentor</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTheses.map((thesis) => (
                <TableRow key={thesis.id}>
                  <TableCell className="font-medium">{thesis.title}</TableCell>
                  <TableCell>{thesis.student}</TableCell>
                  <TableCell>{thesis.mentor}</TableCell>
                  <TableCell>{thesis.department}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(thesis.status)}>
                      {thesis.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{thesis.submittedDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredTheses.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No theses found matching your criteria.
          </div>
        )}
      </CardContent>
    </Card>
  );
};