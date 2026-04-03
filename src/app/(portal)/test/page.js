"use client";

import {
  Award,
  Calendar,
  ChevronDown,
  ChevronUp,
  FileText,
  Info,
  Link as LinkIcon,
  PanelLeft,
  PanelTop,
  Search,
  Settings,
  Target,
  Users
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function IPRCell() {
  const [activeTab, setActiveTab] = useState(1);
  const [layout, setLayout] = useState('sidebar'); // 'sidebar' | 'top'

  const tabsData = [
    {
      id: 1,
      title: 'About',
      icon: Info,
      content: (
        <div className="space-y-4 text-gray-700">
          <Image 
            src="http://cpur.in/wp-content/uploads/2022/09/iprc.jpg" 
            alt="IPRC Logo"
            width={192}
            height={192}
            className="mb-4 rounded shadow-sm w-48 h-auto" 
          />
          <p>Career Point University (CPU), Kota has set up an Intellectual Property Rights Cell (IPRC) at the University to deal with the available and growing knowledge wealth in the University. The IPRC will immensely support the rapidly growing activities on IP education and management in this University.</p>
          <p>The IPR Cell was established in the university with the aim to provide assistance to the students and alumni interested in the matters of IPR. The cell offers assistance by protecting student's interests by making them aware of: the rights over their Intellectual Property, prior-art search report, patentability opinion, drafting patent specifications, preparing filing documents, filing application and follow-up, prosecuting the filled application by responding to office action such as FER, advisory services on various IPR, IP management. To this end, the committee organizes various capacity-building workshops and conferences on IPR and reviews the IP policy of the university. The IPR cell of the university ensures speedy and accurate identification and protection of innovations arising out of the research work carried out by the students and alumni of the university. IPR cells will facilitate the transfer of knowledge and technology from the university to industry and enhance the scope of their commercialization.</p>
          <p>Moreover, the cell also aims to offer assistance to grass-root innovators in the local area.</p>
          <p>As the Cell gains experience, it would also act as a think tank on policy matters related to IPR in India with special emphasis on issues relevant to the local area.</p>
        </div>
      ),
    },
    {
      id: 2,
      title: 'Members of IPR CELL',
      icon: Users,
      content: (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#00588b] text-white">
                <th className="p-3 border border-[#00588b]">Sno.</th>
                <th className="p-3 border border-[#00588b]">Name</th>
                <th className="p-3 border border-[#00588b]">Address</th>
                <th className="p-3 border border-[#00588b]">Designation</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="bg-gray-50"><td className="p-3 border">1.</td><td className="p-3 border">Dr. Abid Hussain</td><td className="p-3 border">Dean, Research</td><td className="p-3 border">Chairperson</td></tr>
              <tr><td className="p-3 border">2.</td><td className="p-3 border">Prof. (Dr.) M.K. Gupta</td><td className="p-3 border">Dean, SOHAS</td><td className="p-3 border">Ex-officio Member</td></tr>
              <tr className="bg-gray-50"><td className="p-3 border">3.</td><td className="p-3 border">Dr. Rakhee Chaudhary</td><td className="p-3 border">Dean, SOBAS</td><td className="p-3 border">Ex-officio Member</td></tr>
              <tr><td className="p-3 border">4.</td><td className="p-3 border">Dr. Mithlesh Malviya</td><td className="p-3 border">Assistant Professor, SOLSG</td><td className="p-3 border">Ex-officio Member</td></tr>
              <tr className="bg-gray-50"><td className="p-3 border">5.</td><td className="p-3 border">Dr. Arun Sharma</td><td className="p-3 border">Associate Professor, SOBAS</td><td className="p-3 border">Ex-officio Member</td></tr>
              <tr><td className="p-3 border">6.</td><td className="p-3 border">Dr. Gunnjeet Kaur</td><td className="p-3 border">Associate Dean, SOAS</td><td className="p-3 border">Ex-officio Member</td></tr>
              <tr className="bg-gray-50"><td className="p-3 border">7.</td><td className="p-3 border">Dr. Garima Tyagi</td><td className="p-3 border">Professor, SOCAT</td><td className="p-3 border">Ex-officio Member</td></tr>
              <tr><td className="p-3 border">8.</td><td className="p-3 border">Prof. (Dr.) Hemlata Saxena</td><td className="p-3 border">Professor, SOBAS</td><td className="p-3 border">Ex-officio Member & Secretary</td></tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      id: 3,
      title: 'Objectives',
      icon: Target,
      content: (
        <div className="space-y-6 text-gray-700">
          <p>The main objective of an IPR Cell under academics is to integrate IPR with the education process...</p>
          <div>
            <h4 className="text-lg font-bold text-[#00588b] mb-2 border-l-4 border-[#fec53a] pl-2">Benefits of Cell</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>In contemporary times, the research is translational and transforms into services or products.</li>
              <li>Possession of IPR makes it safer to enter it in award competitions.</li>
              <li>Even if the Institute would end up becoming the sole owner of students' work, it would provide official letters giving credit.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold text-[#00588b] mb-2 border-l-4 border-[#fec53a] pl-2">Strategies of Cell</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Conducting IPR outreach activities among college faculty, students, and alumni.</li>
              <li>Counseling on career opportunities in IPR specifically to interested students.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: 'Services',
      icon: Settings,
      content: (
        <ul className="list-disc pl-5 space-y-3 text-gray-700 marker:text-[#fec53a]">
          <li>Assisting department to develop and introduce course curriculum on IPR.</li>
          <li>Conducting IPR outreach activities</li>
          <li>Celebrating World IP Day on 26 April</li>
          <li>Counseling on career opportunities in IPR</li>
          <li>Providing prior-art search reports for analyzing Intellectual property</li>
          <li>Drafting patent specifications and preparation of documents</li>
        </ul>
      ),
    },
    {
      id: 5,
      title: 'Events of IPR Cell',
      icon: Calendar,
      content: (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#00588b] text-white">
                <th className="p-3 border border-[#00588b] w-16">SL NO</th>
                <th className="p-3 border border-[#00588b]">Name of the Conference/Seminar/Workshops</th>
                <th className="p-3 border border-[#00588b]">Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="bg-gray-50"><td className="p-3 border">1</td><td className="p-3 border">National e-Conference on Insights into Patent filing Procedure</td><td className="p-3 border">30 May 2020</td></tr>
              <tr><td className="p-3 border">2</td><td className="p-3 border">Workshop on "Intellectual Property Rights and IP Management for Start-up"</td><td className="p-3 border">17 Apr 2021</td></tr>
              <tr className="bg-gray-50"><td className="p-3 border">3</td><td className="p-3 border">Legal Workshop on IPR</td><td className="p-3 border">24 Feb 2022</td></tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      id: 6,
      title: 'IP of the University',
      icon: Award,
      content: (
        <div className="grid md:grid-cols-2 gap-6 text-gray-700">
          <div>
            <h5 className="font-bold text-[#00588b] text-lg">Copyrights</h5>
            <p className="text-sm">Copyright is a right given by the law to creators of literary, dramatic, musical, and artistic works...</p>
          </div>
          <div>
            <h5 className="font-bold text-[#00588b] text-lg">Patents</h5>
            <p className="text-sm">A Patent is a statutory right for an invention granted for a limited period to the patentee by the government...</p>
          </div>
          <div>
            <h5 className="font-bold text-[#00588b] text-lg">Trademarks</h5>
            <p className="text-sm">A trademark is a visual symbol that may be a word signature, name, device, label, numeral...</p>
          </div>
          <div>
            <h5 className="font-bold text-[#00588b] text-lg">Designs</h5>
            <p className="text-sm">'Design' means only the features of shape, configuration, pattern or ornament...</p>
          </div>
        </div>
      ),
    },
    {
      id: 7,
      title: 'Published Patents',
      icon: FileText,
      content: (
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead className="sticky top-0 bg-[#00588b] text-white z-10">
              <tr>
                <th className="p-3 border border-[#00588b]">SI NO</th>
                <th className="p-3 border border-[#00588b]">Name of the Faculty/student</th>
                <th className="p-3 border border-[#00588b]">Title of Patent</th>
                <th className="p-3 border border-[#00588b]">Patent Number</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="bg-gray-50"><td className="p-2 border">1</td><td className="p-2 border">Dr. Abid Hussain, Dr. Amit Sharma</td><td className="p-2 border">A SMART MANGALSUTRA TO GUIDE A PREGNANT WOMAN AND IN EMERGENCY USING IOT.</td><td className="p-2 border">202221019898</td></tr>
              <tr><td className="p-2 border">2</td><td className="p-2 border">Dr. Abid Hussain, Ms. Garima Tyagi</td><td className="p-2 border">A SYSTEMATIC MODEL TO DETECT BLACK FUNGUS APPEARED DURING COVID -19...</td><td className="p-2 border">202211042624</td></tr>
              <tr className="bg-gray-50"><td className="p-2 border">3</td><td className="p-2 border">Vinay Kumar Singh</td><td className="p-2 border">ARTIFICIAL INTELLIGENCE BASED APPROACH TO MONITOR THE GROWTH OF OYSTER MUSHROOM...</td><td className="p-2 border">202241071317</td></tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      id: 8,
      title: 'Useful Links',
      icon: LinkIcon,
      content: (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#00588b] text-white">
                <th className="p-3 border border-[#00588b] w-16">Sno.</th>
                <th className="p-3 border border-[#00588b]">Name</th>
                <th className="p-3 border border-[#00588b]">Website URL</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="bg-gray-50">
                <td className="p-3 border">1.</td>
                <td className="p-3 border font-medium">IPR India</td>
                <td className="p-3 border"><a href="http://www.ipindia.nic.in/" target="_blank" rel="noopener noreferrer" className="text-[#00588b] hover:text-[#fec53a] underline">http://www.ipindia.nic.in/</a></td>
              </tr>
              <tr>
                <td className="p-3 border">2.</td>
                <td className="p-3 border font-medium">IP services India</td>
                <td className="p-3 border"><a href="http://ipindiaservices.gov.in/" target="_blank" rel="noopener noreferrer" className="text-[#00588b] hover:text-[#fec53a] underline">http://ipindiaservices.gov.in/</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      id: 9,
      title: 'Patent search',
      icon: Search,
      content: (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#00588b] text-white">
                <th className="p-3 border border-[#00588b] w-16">Sno.</th>
                <th className="p-3 border border-[#00588b]">Name</th>
                <th className="p-3 border border-[#00588b]">Website URL</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="bg-gray-50">
                <td className="p-3 border">1.</td><td className="p-3 border">InPass</td>
                <td className="p-3 border"><a href="http://ipindiaservices.gov.in/publicsearch/" target="_blank" rel="noopener noreferrer" className="text-[#00588b] hover:text-[#fec53a] underline break-all">http://ipindiaservices.gov.in/publicsearch/</a></td>
              </tr>
              <tr>
                <td className="p-3 border">2.</td><td className="p-3 border">WIPO Patentscope</td>
                <td className="p-3 border"><a href="https://patentscope.wipo.int/search/en/structuredSearch.jsf" target="_blank" rel="noopener noreferrer" className="text-[#00588b] hover:text-[#fec53a] underline break-all">https://patentscope.wipo.int/</a></td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 border">3.</td><td className="p-3 border">Google Patents</td>
                <td className="p-3 border"><a href="https://patents.google.com/" target="_blank" rel="noopener noreferrer" className="text-[#00588b] hover:text-[#fec53a] underline break-all">https://patents.google.com/</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 font-sans">
      
      {/* --- DESKTOP VIEW LAYOUT CONTROLS --- */}
      <div className="hidden md:flex items-center justify-end gap-3 mb-4">
        <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Layout View</span>
        <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
          <button
            onClick={() => setLayout('sidebar')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all text-sm font-medium ${
              layout === 'sidebar' 
                ? 'bg-white text-[#00588b] shadow-sm' 
                : 'text-gray-500 hover:text-[#00588b]'
            }`}
          >
            <PanelLeft size={16} /> Sidebar
          </button>
          <button
            onClick={() => setLayout('top')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all text-sm font-medium ${
              layout === 'top' 
                ? 'bg-white text-[#00588b] shadow-sm' 
                : 'text-gray-500 hover:text-[#00588b]'
            }`}
          >
            <PanelTop size={16} /> Top Tabs
          </button>
        </div>
      </div>

      {/* --- DESKTOP VIEW --- */}
      <div className={`hidden md:flex bg-white rounded-xl shadow-lg border border-gray-100 p-6 transition-all duration-500 ${
        layout === 'sidebar' ? 'flex-row gap-8' : 'flex-col gap-6'
      }`}>
        
        {/* Tab Triggers Container */}
        <div className={`transition-all duration-300 ${
          layout === 'sidebar' 
            ? 'flex flex-col w-1/3 shrink-0 gap-2 border-r border-gray-100 pr-6' 
            : 'flex flex-row flex-wrap items-center gap-2 w-full border-b border-gray-100 pb-4'
        }`}>
          {tabsData.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-lg font-semibold transition-all duration-300 group ${
                  layout === 'sidebar' ? 'px-5 py-4 w-full text-left' : 'px-4 py-2 w-auto'
                } ${
                  isActive
                    ? 'bg-[#00588b] text-white shadow-md ' + (layout === 'sidebar' ? 'translate-x-1' : '')
                    : 'bg-transparent text-[#00588b] hover:bg-[#fec53a]/20 hover:text-[#00588b]'
                }`}
              >
                <Icon 
                  size={layout === 'sidebar' ? 20 : 18} 
                  className={isActive ? 'text-[#fec53a]' : 'text-[#00588b] group-hover:text-[#fec53a] transition-colors'} 
                />
                <span className={layout === 'top' ? 'text-sm' : ''}>{tab.title}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Container */}
        <div className={`${layout === 'sidebar' ? 'w-2/3 flex-grow pl-2' : 'w-full pt-2'}`}>
          {tabsData.map((tab) => (
            activeTab === tab.id && (
              <div key={tab.id} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[#fec53a]">
                  <tab.icon size={28} className="text-[#00588b]" />
                  <h2 className="text-2xl md:text-3xl font-bold text-[#00588b]">
                    {tab.title}
                  </h2>
                </div>
                <div className="prose max-w-none">
                  {tab.content}
                </div>
              </div>
            )
          ))}
        </div>
      </div>

      {/* --- MOBILE VIEW: Accordion (Remains unchanged) --- */}
      <div className="md:hidden flex flex-col gap-3">
        {tabsData.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <div 
              key={tab.id} 
              className={`border rounded-lg overflow-hidden transition-all duration-300 ${
                isActive ? 'border-[#00588b] shadow-md' : 'border-gray-200'
              }`}
            >
              {/* Accordion Header */}
              <button
                onClick={() => setActiveTab(isActive ? null : tab.id)}
                className={`flex items-center justify-between w-full px-4 py-4 font-semibold transition-colors ${
                  isActive 
                    ? 'bg-[#00588b] text-white' 
                    : 'bg-white text-[#00588b] hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3 text-left">
                  <Icon size={20} className={isActive ? 'text-[#fec53a]' : 'text-[#00588b]'} />
                  <span>{tab.title}</span>
                </div>
                {isActive ? <ChevronUp size={20} className="text-[#fec53a] shrink-0" /> : <ChevronDown size={20} className="shrink-0" />}
              </button>

              {/* Accordion Content */}
              {isActive && (
                <div className="p-4 bg-white border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
                  {tab.content}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}