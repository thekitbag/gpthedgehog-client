import React from "react";
import FollowUpQuestionForm from "../forms/followUpQuestionForm";

interface FollowUpQuestionProps {
    thread: object;
    showResponse: () => void;
}

interface FollowUpQuestionState {
}

class FollowUpQuestion extends React.Component<FollowUpQuestionProps, FollowUpQuestionState> {
    render(): React.ReactNode {
        return <FollowUpQuestionForm thread={this.props.thread} showResponse={this.props.showResponse}/>
    }
}

export default FollowUpQuestion