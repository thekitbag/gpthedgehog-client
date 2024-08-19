import React from "react";
import FollowUpQuestionForm from "../forms/followUpQuestionForm";

interface FollowUpQuestionProps  {
    thread: { q: string; a: string; }[];
    showPreloader: () => void;
    hidePreloader: () => void;
    showAnswer: (answer: string, question: string) => void; 
}

interface FollowUpQuestionState {
}

class FollowUpQuestion extends React.Component<FollowUpQuestionProps, FollowUpQuestionState> {
    render(): React.ReactNode {
        return (
            <FollowUpQuestionForm 
                showPreloader={this.props.showPreloader} 
                hidePreloader={this.props.hidePreloader} 
                showAnswer={this.props.showAnswer} 
                thread={this.props.thread} 
            />
        );
    }
}

export default FollowUpQuestion