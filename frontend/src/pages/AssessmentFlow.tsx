import { useState } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label, Badge, Progress, Checkbox } from '../components/ui';
import { CheckCircle2, Upload, AlertCircle, BrainCircuit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { saveOfflineAssessment } from '../lib/db';
import { useNetwork } from '../hooks/useNetwork';

export default function AssessmentFlow() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { isOnline } = useNetwork();
  
  // State for form
  const [formData, setFormData] = useState({
    name: 'Ravi Kumar',
    experience: '8',
    learning: 'on-the-job',
    skills: [] as string[]
  });
  
  const [mappingResult, setMappingResult] = useState<any>(null);
  
  const handleNext = () => setStep(s => s + 1);
  const handlePrev = () => setStep(s => s - 1);
  
  const submitDeclaration = async () => {
    // In a real app, call API
    // Mocking mapping response
    setMappingResult({
      qualification: "Automotive Service Technician (AST-RPL-001)",
      match: 92,
      reasons: ["Vehicle inspection", "Basic diagnostics", "Brake servicing"]
    });
    handleNext();
  };
  
  const completeAssessment = async () => {
    const localId = await saveOfflineAssessment({
      worker: formData,
      mapping: mappingResult,
      status: 'pending_review'
    });
    
    navigate('/worker');
  };

  const skillsList = [
    "Vehicle inspection", "Engine oil replacement", "Brake inspection", 
    "Battery inspection", "Tyre inspection", "Basic fault identification"
  ];

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill) 
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-8">
        <Progress value={(step / 4) * 100} className="mb-2" />
        <div className="flex justify-between text-sm text-gray-500 font-medium">
          <span className={step >= 1 ? "text-blue-600" : ""}>Profile</span>
          <span className={step >= 2 ? "text-blue-600" : ""}>AI Mapping</span>
          <span className={step >= 3 ? "text-blue-600" : ""}>Practical Task</span>
          <span className={step >= 4 ? "text-blue-600" : ""}>Evidence</span>
        </div>
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Worker Self-Declaration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label>Full Name</Label>
                <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <Label>Years of Experience</Label>
                <Input type="number" value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} />
              </div>
              <div>
                <Label>Where did you learn the skill?</Label>
                <select 
                  className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.learning}
                  onChange={e => setFormData({...formData, learning: e.target.value})}
                >
                  <option value="on-the-job">On-the-job / Apprenticeship</option>
                  <option value="family">Family Business</option>
                  <option value="informal">Informal Training</option>
                </select>
              </div>
              
              <div>
                <Label className="mb-2 block">Select tasks you can perform independently:</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {skillsList.map(skill => (
                    <div key={skill} className="flex items-center space-x-2 border p-3 rounded-md">
                      <Checkbox 
                        id={skill} 
                        checked={formData.skills.includes(skill)}
                        onChange={() => toggleSkill(skill)}
                      />
                      <label htmlFor={skill} className="text-sm cursor-pointer">{skill}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={submitDeclaration}>Analyze Profile</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && mappingResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BrainCircuit className="text-blue-600" /> AI Qualification Mapping
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Recommended Qualification</h3>
                  <p className="text-blue-700 font-medium">{mappingResult.qualification}</p>
                </div>
                <Badge className="text-lg px-3 py-1 bg-blue-600 text-white border-transparent">
                  Match: {mappingResult.match}%
                </Badge>
              </div>
              
              <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-sm font-semibold text-gray-700 mb-2">Why this match?</p>
                <ul className="space-y-2">
                  {mappingResult.reasons.map((r: string) => (
                    <li key={r} className="flex items-center text-sm text-gray-600 gap-2">
                      <CheckCircle2 size={16} className="text-green-500" /> {r}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-gray-600 italic mt-4">
                  "The worker's declared experience and task profile closely correspond to the competency areas covered by the selected qualification."
                </p>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePrev}>Back</Button>
              <Button onClick={handleNext}>Proceed to Tasks</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Practical Assessment Checklist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="mb-4">
              <h3 className="font-bold mb-2">TASK 01: Inspect a vehicle for visible external damage.</h3>
              <p className="text-sm text-gray-500 mb-4">Complete the following steps carefully.</p>
              
              <div className="space-y-3">
                {["Inspect front section", "Inspect rear section", "Inspect tyres", "Identify visible defects"].map((task, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
                    <span className="text-sm font-medium">{task}</span>
                    <Badge variant="outline" className="text-gray-500">Pending Evaluation</Badge>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePrev}>Back</Button>
              <Button onClick={handleNext}>Upload Evidence</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Upload Task Evidence</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {!isOnline && (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-md flex items-start gap-3">
                <AlertCircle className="shrink-0" />
                <div className="text-sm">
                  <p className="font-bold">Offline Mode</p>
                  <p>You are currently offline. Evidence will be saved locally and synced automatically when you reconnect.</p>
                </div>
              </div>
            )}
          
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:bg-gray-50 transition-colors cursor-pointer">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-sm font-medium text-gray-900">Click to upload video or images</p>
              <p className="text-xs text-gray-500 mt-1">MP4, JPG, PNG up to 50MB</p>
              
              <div className="mt-6 flex justify-center">
                 {/* Mocking a selected file for prototype */}
                 <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    <CheckCircle2 size={16} /> vehicle_inspection.mp4
                 </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-xs text-gray-500 text-center">
                AI will analyze this evidence to recommend scores to the human assessor.
              </p>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePrev}>Back</Button>
              <Button onClick={completeAssessment}>Submit for Assessor Review</Button>
            </div>
          </CardContent>
        </Card>
      )}

    </div>
  );
}
