import React, { useState, useEffect } from "react";


function JobsPage() {


  return (
    <div className="container">
    <div className="gen-wrapper">
        <div>
    <img src="https://i.imgur.com/PjblnCG.png" className="jobs_photo" alt="This could be you!"/>
    <p><i className="underphoto_text">This could be you!</i></p>
    </div>

    <div className="breadText">

        <h1>Job Openings</h1>
    <li>Position: Dark Magical Artifacts Auction Specialist</li>
    <li>Position: Hellish Influencer (remote)</li>
    <li>Position: Dark Magical Artifacts Auction Specialist</li>
    <li>Position:Shadowy Events Coordinator</li>
    <li>Position: Necromancy Consultant</li>
    <br/>
Please email us with your resume!
</div>
</div>
</div>

  );
}

export default JobsPage;
