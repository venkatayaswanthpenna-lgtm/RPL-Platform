import { Card, CardContent, CardHeader, CardTitle } from '../components/ui';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {

  const consistencyData = [
    { name: 'Task 1', manual: 60, aiAssisted: 85 },
    { name: 'Task 2', manual: 65, aiAssisted: 88 },
    { name: 'Task 3', manual: 55, aiAssisted: 82 },
    { name: 'Task 4', manual: 70, aiAssisted: 90 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Research & Validation Dashboard</h1>
        <div className="px-3 py-1 bg-gray-100 rounded text-sm text-gray-600 border">Prototype Simulation</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-6"><div className="text-sm font-medium text-gray-500 mb-1">Total Assessments</div><div className="text-3xl font-bold text-gray-900">124</div></CardContent></Card>
        <Card><CardContent className="p-6"><div className="text-sm font-medium text-gray-500 mb-1">Manual Agreement</div><div className="text-3xl font-bold text-red-600">68%</div></CardContent></Card>
        <Card><CardContent className="p-6"><div className="text-sm font-medium text-gray-500 mb-1">AI-Assisted Agreement</div><div className="text-3xl font-bold text-green-600">86%</div></CardContent></Card>
        <Card className="bg-green-50"><CardContent className="p-6"><div className="text-sm font-medium text-green-700 mb-1">Consistency Improvement</div><div className="text-3xl font-bold text-green-700">+18 pts</div></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Assessor Consistency Experiment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={consistencyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="manual" name="Manual Agreement %" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="aiAssisted" name="AI-Assisted Agreement %" fill="#2563eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-500 text-center mt-4 italic">
              * Simulated prototype data. Shows inter-assessor agreement percentage across common evaluation tasks.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Architecture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 font-mono text-sm border p-4 bg-gray-50 rounded-md">
              <div className="flex items-center gap-4 text-blue-700"><span>1.</span> WORKER (Mobile/PWA Offline)</div>
              <div className="pl-4 border-l-2 border-gray-300 ml-2 py-2">
                <div>↳ Self Declaration</div>
                <div>↳ Task Evidence</div>
              </div>
              <div className="flex items-center gap-4 text-purple-700"><span>2.</span> AI ENGINE</div>
              <div className="pl-4 border-l-2 border-gray-300 ml-2 py-2">
                <div>↳ Qualification Mapping</div>
                <div>↳ Standardized Rubric Scoring</div>
              </div>
              <div className="flex items-center gap-4 text-green-700"><span>3.</span> HUMAN ASSESSOR</div>
              <div className="pl-4 border-l-2 border-gray-300 ml-2 py-2">
                <div>↳ Validation & Verification</div>
                <div>↳ Final Competency Decision</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
