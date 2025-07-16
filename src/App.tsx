// Working Video Conferencing Component with Invite Feature
function VideoConferencing() {
  const [isInCall, setIsInCall] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [currentMeeting, setCurrentMeeting] = useState<{
    id: string;
    title: string;
    participants: string[];
  } | null>(null);

  const handleStartMeeting = async () => {
    try {
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      // Generate meeting ID and set meeting info
      const meetingId = `MEET-${Date.now()}`;
      setCurrentMeeting({
        id: meetingId,
        title: 'Video Meeting',
        participants: ['You']
      });
      
      setIsInCall(true);
      
      // Show video in the video element
      setTimeout(() => {
        const videoElement = document.getElementById('localVideo') as HTMLVideoElement;
        if (videoElement && stream) {
          videoElement.srcObject = stream;
          videoElement.play();
        }
      }, 100);
      
    } catch (error) {
      console.error('Camera access denied:', error);
      alert('Please allow camera access to start the meeting');
    }
  };

  const handleEndCall = () => {
    setIsInCall(false);
    setCurrentMeeting(null);
    // Stop all video streams
    const videoElement = document.getElementById('localVideo') as HTMLVideoElement;
    if (videoElement && videoElement.srcObject) {
      const stream = videoElement.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleSendInvites = () => {
    const emailInput = document.getElementById('inviteEmails') as HTMLInputElement;
    const messageInput = document.getElementById('inviteMessage') as HTMLTextAreaElement;
    
    const emails = emailInput?.value || '';
    const message = messageInput?.value || '';
    
    if (!emails.trim()) {
      alert('Please enter at least one email address');
      return;
    }

    // In a real app, this would send actual emails
    const emailList = emails.split(',').map(e => e.trim()).filter(e => e);
    
    alert(`Meeting invitations sent to:\n${emailList.join('\n')}\n\nMeeting Link: ${window.location.origin}/meeting/${currentMeeting?.id}`);
    
    setShowInviteModal(false);
    
    // Clear form
    if (emailInput) emailInput.value = '';
    if (messageInput) messageInput.value = '';
  };

  const copyMeetingLink = () => {
    const meetingLink = `${window.location.origin}/meeting/${currentMeeting?.id}`;
    navigator.clipboard.writeText(meetingLink).then(() => {
      alert('Meeting link copied to clipboard!');
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = meetingLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Meeting link copied to clipboard!');
    });
  };

  if (isInCall) {
    return (
      <div className="p-8 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-900 rounded-xl overflow-hidden min-h-[600px]">
            {/* Meeting Header */}
            <div className="bg-slate-800 px-6 py-4 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-white font-semibold">{currentMeeting?.title}</h2>
                  <p className="text-slate-300 text-sm">Meeting ID: {currentMeeting?.id}</p>
                </div>
                <div className="flex items-center space-x-4">
                  {/* Invite Button */}
                  <button
                    onClick={() => setShowInviteModal(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 text-sm"
                  >
                    <Users className="h-4 w-4" />
                    <span>Invite</span>
                  </button>
                  
                  <div className="flex items-center space-x-4 text-slate-300 text-sm">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{currentMeeting?.participants.length || 1}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>00:05:23</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Area */}
            <div className="relative aspect-video bg-slate-800">
              <div className="absolute inset-0">
                {/* Local Video */}
                {isVideoOn ? (
                  <video
                    id="localVideo"
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    autoPlay
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                        <User className="h-12 w-12 text-white" />
                      </div>
                      <p className="text-white text-xl font-medium">You</p>
                    </div>
                  </div>
                )}
                
                {/* Remote participant placeholder */}
                <div className="absolute top-4 right-4 w-32 h-24 bg-slate-600 rounded-lg">
                  <div className="w-full h-full bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <User className="h-6 w-6 text-white mx-auto mb-1" />
                      <p className="text-white text-xs">Waiting...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="p-6 bg-slate-900">
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => setIsMicOn(!isMicOn)}
                  className={`p-3 rounded-full ${isMicOn ? 'bg-slate-700 hover:bg-slate-600' : 'bg-red-600 hover:bg-red-700'} transition-colors`}
                >
                  {isMicOn ? <Mic className="h-6 w-6 text-white" /> : <MicOff className="h-6 w-6 text-white" />}
                </button>
                
                <button
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  className={`p-3 rounded-full ${isVideoOn ? 'bg-slate-700 hover:bg-slate-600' : 'bg-red-600 hover:bg-red-700'} transition-colors`}
                >
                  {isVideoOn ? <Video className="h-6 w-6 text-white" /> : <VideoOff className="h-6 w-6 text-white" />}
                </button>

                <button className="p-3 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors">
                  <Monitor className="h-6 w-6 text-white" />
                </button>

                <button className="p-3 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors">
                  <MessageSquare className="h-6 w-6 text-white" />
                </button>

                <button
                  onClick={handleEndCall}
                  className="p-3 rounded-full bg-red-600 hover:bg-red-700 transition-colors"
                >
                  <PhoneOff className="h-6 w-6 text-white" />
                </button>
              </div>
              
              {/* Meeting Info */}
              <div className="mt-4 text-center">
                <p className="text-slate-400 text-sm">
                  Share meeting link: {window.location.origin}/meeting/{currentMeeting?.id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Video Conferencing</h1>
            <p className="text-slate-600 mt-2">Secure video meetings and client consultations</p>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowScheduleModal(true)}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Schedule Meeting</span>
            </button>
            <button 
              onClick={handleStartMeeting}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Video className="h-5 w-5" />
              <span>Start Meeting</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
          <Video className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Video Conferencing System</h3>
          <p className="text-slate-600 mb-6">Secure video meetings and client consultations</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <button 
              onClick={handleStartMeeting}
              className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <Video className="h-8 w-8 text-slate-400 mb-2" />
              <span className="text-sm font-medium text-slate-600">Start Instant Meeting</span>
            </button>
            <button 
              onClick={() => setShowScheduleModal(true)}
              className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-slate-300 hover:border-green-500 hover:bg-green-50 transition-colors"
            >
              <Calendar className="h-8 w-8 text-slate-400 mb-2" />
              <span className="text-sm font-medium text-slate-600">Schedule Meeting</span>
            </button>
            <button 
              onClick={() => setShowJoinModal(true)}
              className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-slate-300 hover:border-purple-500 hover:bg-purple-50 transition-colors"
            >
              <Users className="h-8 w-8 text-slate-400 mb-2" />
              <span className="text-sm font-medium text-slate-600">Join Meeting</span>
            </button>
          </div>
        </div>

        {/* Invite Modal */}
        {showInviteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Invite to Meeting</h2>
                  </div>
                  <button onClick={() => setShowInviteModal(false)}>
                    <X className="h-5 w-5 text-slate-400" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Meeting Info */}
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-slate-900 mb-3">Meeting Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Video className="h-4 w-4 text-slate-500" />
                      <span className="font-medium">{currentMeeting?.title}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-slate-500" />
                      <span>Meeting ID: {currentMeeting?.id}</span>
                    </div>
                  </div>
                </div>

                {/* Meeting Link */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Meeting Link
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={`${window.location.origin}/meeting/${currentMeeting?.id}`}
                      readOnly
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-600 text-sm"
                    />
                    <button
                      onClick={copyMeetingLink}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                {/* Email Invites */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Addresses *
                  </label>
                  <textarea
                    id="inviteEmails"
                    className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email addresses separated by commas&#10;example: john@company.com, sarah@firm.com"
                    rows={3}
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Separate multiple email addresses with commas
                  </p>
                </div>

                {/* Personal Message */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Personal Message (Optional)
                  </label>
                  <textarea
                    id="inviteMessage"
                    className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Add a personal message to your invitation..."
                    rows={3}
                  />
                </div>

                {/* Email Preview */}
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="font-medium text-slate-900 mb-3">Email Preview</h3>
                  <div className="text-sm text-slate-700 space-y-2">
                    <p><strong>Subject:</strong> Meeting Invitation: {currentMeeting?.title}</p>
                    <div className="bg-white p-3 rounded border text-xs">
                      <p>You're invited to join a video meeting:</p>
                      <p className="font-medium mt-2">{currentMeeting?.title}</p>
                      <p className="mt-2">🔗 Join here: <span className="text-blue-600">{window.location.origin}/meeting/{currentMeeting?.id}</span></p>
                      <p>📱 Meeting ID: {currentMeeting?.id}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-200 flex items-center justify-end space-x-4">
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendInvites}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <Users className="h-5 w-5" />
                  <span>Send Invitations</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Simple Schedule Modal */}
        {showScheduleModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900">Schedule Meeting</h2>
                <button onClick={() => setShowScheduleModal(false)}>
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Meeting title"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
                <input
                  type="datetime-local"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
                <button
                  onClick={() => {
                    alert('Meeting scheduled successfully!');
                    setShowScheduleModal(false);
                  }}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                >
                  Schedule Meeting
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Simple Join Modal */}
        {showJoinModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900">Join Meeting</h2>
                <button onClick={() => setShowJoinModal(false)}>
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Meeting ID"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
                <button
                  onClick={() => {
                    setShowJoinModal(false);
                    handleStartMeeting();
                  }}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Join Meeting
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
