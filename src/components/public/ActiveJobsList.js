import React, { Component } from "react";
import axios from "axios";
import "./activejobs.scss";

export default class JobListings extends Component {
  constructor() {
    super();
    this.state = {
      job: [],
      company: "",
      city: "",
      state: "",
      description: "",
      languages: ""
    };
  }
  componentDidMount() {
    axios.get("/api/getAllJobs").then(res => {
      this.setState({ job: res.data });
    });
  }
  addJob = () => {
    axios
      .post("/api/addNewJobs", {
        company: this.state.company,
        city: this.state.city,
        state: this.state.state,
        description: this.state.description,
        languages: this.state.languages
      })
      .then(res => {
        this.setState({
          job: res.data,
          company: "",
          city: "",
          state: "",
          description: "",
          languages: ""
        });
      });
  };
  removeJob = id => {
    axios
      .delete(`/api/removeJobs${id}`)
      .then(res => this.setState({ job: res.data }));
  };
  updateJob = id => {
    axios
      .put(`/api/removeJobs/${id}`, {
        id: this.state.id,
        company: this.state.company,
        city: this.state.city,
        state: this.state.state,
        description: this.state.description,
        languages: this.state.languages
      })
      .then(res => {
        this.setState({
          job: res.data,
          company: "",
          city: "",
          state: "",
          description: "",
          languages: ""
        });
      });
  };

  applyClick = (job_id, title) => {
    job_id = +job_id;
    axios.post(`/api/apply`, { job_id }).then(res => {
      alert(`Congrats! Your application for ${title} is on its way!`);
    });
  };

  render() {
    const displayJob = this.state.job.map((posting, i) => {
      return (
        <div key={i}>
          <div className="listings">
            {posting.title}
            <br />
            {posting.company}
            <br />
            {posting.city}
            <br />
            {posting.state}
            <br />
            {posting.description}
            <br />
            {posting.languages}
            <br />
            <button
              onClick={() => {
                this.applyClick(posting.id, posting.title);
              }}
            >
              apply
            </button>
          </div>
        </div>
      );
    });

    return (
      <div>
        <h1 className="list"> {displayJob}</h1>
      </div>
    );
  }
}
