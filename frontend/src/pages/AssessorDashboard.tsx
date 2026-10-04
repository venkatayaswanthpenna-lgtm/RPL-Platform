import { useState } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from '../components/ui';
import { BrainCircuit, ShieldCheck, CheckCircle2, User, AlertCircle } from 'lucide-react';
import { useNetwork } from '../hooks/useNetwork';

export default function AssessorDashboard() {
  const [selectedAssessment, setSelectedAssessment] = useState<any>(null);
  const [assessorScore, setAssessorScore] = useState<number | null>(null);
  const [validationComplete, setValidationComplete] = useState(false);
  const { isOnline } = useNetwork();

  // Mock data
  const pendingAssessments = [
    { id: 1, name: "Ravi Kumar", trade: "Automotive Service Technician", status: "pending_review", date: "Today" },
    { id: 2, name: "Anita Sharma", trade: "Two-Wheeler Mechanic", status: "pending_review", date: "Yesterday" }
  ];

  const mockAnalysis = {
    criterion: "PC1: Inspect vehicle exterior and identify visible defects.",
    aiScore: 3,
    maxScore: 4,
    confidence: 89,
    reason: "Candidate correctly identified visible damage. Hand placement and systematic approach matched standard procedures.",
    missing: "Video does not clearly demonstrate documentation of inspection findings."
  };

  const selectAssessment = (a: any) => {
    setSelectedAssessment(a);
    setValidationComplete(false);
    setAssessorScore(null);
  };

  const finalizeScore = () => {
    setValidationComplete(true);
  };

  if (!selectedAssessment) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Assessor Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-indigo-50 border-indigo-100"><CardContent className="p-6"><div className="text-sm font-medium text-indigo-600 mb-1">Pending Reviews</div><div className="text-3xl font-bold text-gray-900">12</div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="text-sm font-medium text-gray-500 mb-1">Completed</div><div className="text-3xl font-bold text-gray-900">48</div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="text-sm font-medium text-gray-500 mb-1">Avg Competency</div><div className="text-3xl font-bold text-gray-900">78%</div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="text-sm font-medium text-gray-500 mb-1">Offline Sync</div><div className="text-3xl font-bold text-gray-900">{isOnline ? 'Active' : 'Pending'}</div></CardContent></Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Assigned Assessments Awaiting Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {pendingAssessments.map(a => (
                <div key={a.id} className="py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{a.name}</p>
                      <p className="text-sm text-gray-500">{a.trade}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">{a.date}</span>
                    <Badge className="bg-yellow-100 text-yellow-800 border-transparent hover:bg-yellow-100">Review Required</Badge>
                    <Button onClick={() => selectAssessment(a)} size="sm">Start Review</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Assessment Review: {selectedAssessment.name}</h1>
        <Button variant="outline" onClick={() => setSelectedAssessment(null)}>Back to Dashboard</Button>
      </div>

      {/* Human-in-the-loop indicator */}
      <div className="flex items-center justify-center gap-4 py-4 mb-6 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex flex-col items-center"><BrainCircuit className="text-indigo-500 mb-1"/> <span className="text-xs font-semibold">AI Support</span></div>
        <div className="h-0 w-8 border-t-2 border-dashed border-gray-300"></div>
        <div className="flex flex-col items-center"><ShieldCheck className="text-green-600 mb-1"/> <span className="text-xs font-semibold">Human Assessor</span></div>
        <div className="h-0 w-8 border-t-2 border-dashed border-gray-300"></div>
        <div className="flex flex-col items-center"><CheckCircle2 className="text-gray-900 mb-1"/> <span className="text-xs font-semibold">Final Outcome</span></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: EVIDENCE */}
        <Card className="h-full">
          <CardHeader className="bg-gray-50 border-b pb-4">
            <CardTitle className="text-lg">Worker Evidence</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="aspect-video bg-gray-900 rounded-md flex items-center justify-center text-gray-500 relative overflow-hidden group">
               <span className="z-10 group-hover:hidden">vehicle_inspection.mp4</span>
               {/* Mock player UI */}
               <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">▶</div>
               </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-sm mb-2">Checklist Status</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between border-b pb-1"><span>Inspect front section</span> <CheckCircle2 size={16} className="text-green-500"/></li>
                <li className="flex justify-between border-b pb-1"><span>Inspect tyres</span> <CheckCircle2 size={16} className="text-green-500"/></li>
                <li className="flex justify-between"><span>Record findings</span> <AlertCircle size={16} className="text-yellow-500"/></li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* CENTER: AI ANALYSIS */}
        <Card className="h-full border-indigo-200">
          <CardHeader className="bg-indigo-50 border-b border-indigo-100 pb-4">
            <CardTitle className="text-lg flex items-center gap-2 text-blue-900">
              <BrainCircuit size={20} /> AI Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-6">
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-1">Criterion mapped:</p>
              <p className="text-sm font-medium">{mockAnalysis.criterion}</p>
            </div>
            
            <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Recommended Score</p>
                  <p className="text-4xl font-bold text-indigo-600">{mockAnalysis.aiScore}<span className="text-lg text-gray-400">/{mockAnalysis.maxScore}</span></p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Confidence</p>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">{mockAnalysis.confidence}%</Badge>
                </div>
              </div>
              
              <div className="space-y-3 pt-3 border-t border-gray-100">
                <div>
                  <p className="text-xs font-semibold text-gray-500">REASONING</p>
                  <p className="text-sm text-gray-800">{mockAnalysis.reason}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-yellow-600 flex items-center gap-1"><AlertCircle size={12}/> MISSING EVIDENCE</p>
                  <p className="text-sm text-gray-800">{mockAnalysis.missing}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* RIGHT: ASSESSOR DECISION */}
        <Card className="h-full border-gray-300 shadow-md">
          <CardHeader className="bg-gray-100 border-b pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <ShieldCheck size={20} className="text-green-600" /> Assessor Decision
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-6">
            
            {validationComplete ? (
               <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center space-y-4 h-full flex flex-col justify-center">
                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                   <CheckCircle2 size={32} />
                 </div>
                 <div>
                   <h3 className="font-bold text-green-900 text-lg">Score Validated</h3>
                   <p className="text-sm text-green-700 mt-1">Final Score: {assessorScore}/{mockAnalysis.maxScore}</p>
                 </div>
                 <Button variant="outline" className="mt-4 w-full" onClick={() => setSelectedAssessment(null)}>Return to Pending</Button>
               </div>
            ) : (
              <>
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-gray-700">Standardized Rubric (PC1)</p>
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map(score => (
                      <label 
                        key={score} 
                        className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer transition-colors ${
                          assessorScore === score ? 'border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500' : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <input 
                          type="radio" 
                          name="score" 
                          value={score} 
                          checked={assessorScore === score}
                          onChange={() => setAssessorScore(score)}
                          className="w-4 h-4 text-indigo-600"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-sm text-gray-900">Level {score}</span>
                            {mockAnalysis.aiScore === score && <Badge className="bg-indigo-100 text-indigo-700 border-transparent text-[10px] h-5 py-0 px-2">AI Rec</Badge>}
                          </div>
                          <span className="text-xs text-gray-500">
                            {score === 1 && "Limited understanding, requires assistance."}
                            {score === 2 && "Basic performance with some guidance."}
                            {score === 3 && "Competent, independent performance."}
                            {score === 4 && "Advanced, accurate, and consistent."}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-700">Assessor Comments (Optional)</p>
                  <textarea 
                    className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
                    rows={3}
                    placeholder="E.g., Candidate independently identified..."
                  ></textarea>
                </div>

                <Button 
                  className="w-full font-bold" 
                  disabled={assessorScore === null}
                  onClick={finalizeScore}
                >
                  VALIDATE & FINALIZE SCORE
                </Button>
              </>
            )}

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
