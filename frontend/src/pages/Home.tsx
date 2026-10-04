import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, CardContent } from '../components/ui';
import { ShieldCheck, BrainCircuit, Users, WifiOff, FileCheck2, Activity } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center max-w-5xl mx-auto space-y-16 py-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-600 mb-4">
          <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
          Prototype v1.0
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight lg:text-6xl text-gray-900">
          Eviloop Assessment, <span className="text-blue-600">Reimagined</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          AI-assisted, evidence-driven competency assessment for India's informal workforce. 
          Scalable, consistent, and offline-capable.
        </p>
        
        <div className="flex justify-center gap-4 pt-4">
          <Button size="lg" className="text-lg px-8 py-6 h-auto" onClick={() => navigate('/worker/assessment')}>
            <span className="flex items-center gap-2">
              <span className="text-2xl">🚀</span> Start Demo
            </span>
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto" onClick={() => navigate('/admin')}>
            View Dashboard
          </Button>
        </div>
      </div>

      {/* Architecture/Flow */}
      <div className="w-full">
        <h2 className="text-2xl font-bold text-center mb-8">Demonstrated Workflow</h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
          {[
            { label: "Self Declaration", icon: <Users size={24}/> },
            { label: "AI Mapping", icon: <BrainCircuit size={24}/> },
            { label: "Practical Task", icon: <Activity size={24}/> },
            { label: "AI Assistance", icon: <BrainCircuit size={24}/> },
            { label: "Human Validation", icon: <ShieldCheck size={24}/> },
            { label: "Certification", icon: <FileCheck2 size={24}/> }
          ].map((step, i, arr) => (
            <div key={i} className="flex flex-col md:flex-row items-center w-full">
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-blue-600 shadow-sm relative z-10">
                  {step.icon}
                </div>
                <span className="text-sm font-medium text-center">{step.label}</span>
              </div>
              {i < arr.length - 1 && (
                <div className="h-8 md:h-0 w-0 md:w-full border-l-2 md:border-t-2 border-dashed border-gray-300 md:-mt-8 flex-1"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-2 gap-8 w-full mt-12">
        <Card>
          <CardContent className="p-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <ShieldCheck className="text-green-600" /> What AI Does
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center gap-2">✓ Structures worker declarations</li>
              <li className="flex items-center gap-2">✓ Suggests qualification mapping</li>
              <li className="flex items-center gap-2">✓ Maps evidence to criteria</li>
              <li className="flex items-center gap-2">✓ Recommends scores</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <ShieldCheck className="text-red-600" /> What AI Does NOT Do
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center gap-2">✗ Issue certification</li>
              <li className="flex items-center gap-2">✗ Replace the assessor</li>
              <li className="flex items-center gap-2">✗ Make final competency decisions</li>
              <li className="flex items-center gap-2">✗ Override assessor judgement</li>
            </ul>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
