import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Progress } from '../components/ui';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Clock } from 'lucide-react';

export default function WorkerDashboard() {
  const navigate = useNavigate();

  // Mock profile data
  const profile = {
    name: "Ravi Kumar",
    trade: "Automotive Service Technician",
    overallCompetency: 76,
    status: "in_progress" // can be completed
  };

  const steps = [
    { label: "Self-declaration", status: "completed" },
    { label: "Qualification mapping", status: "completed" },
    { label: "Practical tasks", status: "completed", detail: "4/4 Tasks" },
    { label: "Evidence submission", status: "completed", detail: "7 items" },
    { label: "Assessor review", status: "in_progress" },
    { label: "Certification", status: "pending" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Worker Dashboard</h1>
        <Button onClick={() => navigate('/worker/assessment')}>Start New Assessment</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Assessment Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {steps.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="mt-0.5">
                    {step.status === 'completed' && <CheckCircle2 className="text-green-500" />}
                    {step.status === 'in_progress' && <Clock className="text-blue-500" />}
                    {step.status === 'pending' && <div className="w-6 h-6 rounded-full border-2 border-gray-200" />}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${step.status === 'pending' ? 'text-gray-400' : 'text-gray-900'}`}>
                      {step.label}
                    </p>
                    {step.detail && <p className="text-sm text-gray-500">{step.detail}</p>}
                  </div>
                  <div>
                    {step.status === 'completed' && <Badge variant="outline" className="text-green-700 bg-green-50 border-green-200">Done</Badge>}
                    {step.status === 'in_progress' && <Badge className="bg-blue-100 text-blue-700 border-transparent">In Progress</Badge>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-blue-50 border-blue-100">
            <CardContent className="p-6">
              <div className="text-sm font-medium text-blue-600 mb-4">Competency Profile</div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-gray-700 font-semibold">{profile.trade}</span>
                <span className="text-2xl font-bold text-gray-900">{profile.overallCompetency}%</span>
              </div>
              <Progress value={profile.overallCompetency} className="h-2 bg-blue-200 [&>div]:bg-blue-600" />
              <p className="text-xs text-gray-500 mt-4 text-center">
                Estimated competency based on mapped tasks. Final score requires assessor validation.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Evidence Gaps</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-yellow-700">
                  <div className="w-2 h-2 rounded-full bg-yellow-500" /> Electrical diagnostics
                </li>
                <li className="flex items-center gap-2 text-yellow-700">
                  <div className="w-2 h-2 rounded-full bg-yellow-500" /> Documentation procedure
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
