let jobs = [
    { id: 1, company: "Mobile First Corp", 
        role: "React Native Developer", 
        loc: "Remote", 
        type: "Full-time", 
        salary: "$130k - $175k", 
        description: "Build cross-platform mobile applications using React Native and Redux. Focus on high-performance UI and fluid animations.", 
        status: "all" },
    { id: 2, company: "WebFlow Agency", 
        role: "Web Designer & Developer", 
        loc: "Los Angeles, CA", 
        type: "Part-time", 
        salary: "$80k - $120k", 
        description: "Create stunning web experiences for high-profile clients. Must have excellent UX/UI experience with Webflow and JavaScript.", 
        status: "all" },
    { id: 3, company: "DataViz Solutions", 
        role: "Data Visualization Specialist", 
        loc: "Austin, TX", 
        type: "Full-time", 
        salary: "$90k - $120k", 
        description: "Transform complex datasets into interactive visual stories. Required skills: D3.js, React, and strong analytical thinking.", 
        status: "all" },
    { id: 4, company: "GreenField Inc", 
        role: "Backend Developer", 
        loc: "Remote", 
        type: "Full-time", 
        salary: "$110k - $140k", 
        description: "Design and maintain scalable backend systems using Node.js and AWS. Focus on performance and database optimization.", 
        status: "all" },
    { id: 5, company: "Innovative Labs", 
        role: "UI/UX Designer", 
        loc: "Portland, OR", 
        type: "Full-time", 
        salary: "$85k - $110k", 
        description: "Create beautiful and functional user interfaces for our mobile products. Strong focus on user research and prototyping.", 
        status: "all" },
    { id: 6, company: "MegaCorp Solutions", 
        role: "Java Software Developer", 
        loc: "New York, NY", 
        type: "Part-time", 
        salary: "$100k - $130k", 
        description: "Build enterprise-grade software with Java Spring Boot. Collaborate with cross-functional teams in an agile environment.", 
        status: "all" },
    { id: 7, company: "StartupXYZ", 
        role: "Full Stack Engineer", 
        loc: "Remote", 
        type: "Full-time", 
        salary: "$120k - $150k", 
        description: "Join our growing startup and help us build the next big platform. Experience with React, Node.js, and MongoDB required.", 
        status: "all" },
    { id: 8, company: "TechCorp Industries", 
        role: "Senior Frontend Developer", 
        loc: "San Francisco, CA", 
        type: "Full-time", 
        salary: "$140k - $170k", 
        description: "Lead our frontend team in building modern web applications using React and Tailwind CSS. Focus on performance and accessibility.", 
        status: "all" }
];
const container = document.getElementById('job-container');
function AllJobs(filter = 'all') {
    const filtered = filter === 'all' ? jobs : jobs.filter(j => j.status === filter);
    container.innerHTML = '';

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-100 shadow-sm w-full">
                <img src="Image/jobs.png" class="w-24 mb-4 opacity-20" alt="No jobs">
                <h3 class="text-xl font-bold text-gray-700">No jobs available</h3>
                <p class="text-gray-400">Check back later for new opportunities</p>
            </div>`;
        updateDashboard(); 
        return;
    }

    filtered.forEach(job => {
        const isInterview = job.status === 'interview';
        const isRejected = job.status === 'rejected';
        
        let borderClass = "border-gray-100";

        const card = document.createElement('div');
        card.className = `bg-white p-6 rounded-lg border shadow-sm flex flex-col gap-2 relative transition-all duration-300 ${borderClass}`;
        
        card.innerHTML = `
            <button onclick="deleteJob(${job.id})" class="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            
            <h4 class="font-bold text-lg text-gray-800">${job.company}</h4>
            <p class="text-md font-semibold text-gray-600">${job.role}</p>
            <p class="text-sm text-gray-400 font-medium">${job.loc} - ${job.type} - ${job.salary}</p>
            
            <div class="my-2 h-6">
                <span class="px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${isInterview ? 'bg-green-500 text-white' : isRejected ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-400'}">
                    ${job.status === 'all' ? 'Not Applied' : job.status}
                </span>
            </div>

            <p class="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">${job.description}</p>

            <div class="flex gap-3 mt-auto">
                <button onclick="updateStatus(${job.id}, 'interview')" 
                    class="btn btn-sm flex-1 font-bold ${isInterview ? 'btn-success' : 'btn-outline btn-success'}">
                    Interview
                </button>
                <button onclick="updateStatus(${job.id}, 'rejected')" 
                    class="btn btn-sm flex-1 font-bold ${isRejected ? 'btn-error' : 'btn-outline btn-error'}">
                    Rejected
                </button>
            </div>`;

        container.appendChild(card);
    });
    updateDashboard();
}

function updateStatus(id, newStatus) {
    const job = jobs.find(j => j.id === id);
    job.status = (job.status === newStatus) ? 'all' : newStatus;
    const activeTabText = document.querySelector('.tab-active').innerText.toLowerCase();
    AllJobs(activeTabText);
}

function deleteJob(id) {
    jobs = jobs.filter(j => j.id !== id);
    const activeTabText = document.querySelector('.tab-active').innerText.toLowerCase();
    AllJobs(activeTabText);
}

function updateDashboard() {
    const totalCount = jobs.length;
    const interviewCount = jobs.filter(j => j.status === 'interview').length;
    const rejectedCount = jobs.filter(j => j.status === 'rejected').length;

    document.getElementById('total-count').innerText = totalCount;
    document.getElementById('interview-count').innerText = interviewCount;
    document.getElementById('rejected-count').innerText = rejectedCount;

    // Sync Section Title Counter (The Bug Fix)
    const activeTab = document.querySelector('.tab-active').innerText.toLowerCase();
    let currentViewCount = totalCount;
    if (activeTab === 'interview') currentViewCount = interviewCount;
    if (activeTab === 'rejected') currentViewCount = rejectedCount;
    
    document.getElementById('job-count-label').innerText = `${currentViewCount}`;
}

//Tab Navigation Logic
window.filterJobs = function(type, el) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('tab-active'));
    el.classList.add('tab-active');
    AllJobs(type);
};

AllJobs();