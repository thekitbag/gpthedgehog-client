import { IonCard, IonCardHeader, IonCardContent} from '@ionic/react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { postAudio } from '../utils/api';

interface AudioQuestionProps {
    showAnswer: (question: string, answer:string) => void;
    showPreloader: () => void;
    tryAgain: () =>  void;
}


const AudioQuestionRecorder = (props: AudioQuestionProps) => {
    const recorderControls = useAudioRecorder();
    async function sendAudio(blob: Blob) {
        props.showPreloader()
        let r = await postAudio('/audio_question', blob);

        if (r) {
            if(r.data === 'unable to transcribe question') {
                props.tryAgain()
            } else {
                const results = r.data.answer;
                const question = r.data.question;
                props.showAnswer(results, question);
            }
        } else {
            // Handle the case when r is undefined
            console.error('Request failed');
        }
    };

    const getAudioRecorderClasses = () => {
        return {AudioRecorderClass:'arc-ac'}
    }
  
    return (
            <IonCard>
                <IonCardHeader>
                    <p className='recording-prompt'>Click or tap the microphone icon and ask your question</p>
                </IonCardHeader>
                <IonCardContent>
                    <AudioRecorder
                    onRecordingComplete={(blob) => sendAudio(blob)}
                    recorderControls={recorderControls}
                    classes={getAudioRecorderClasses()}
                    />
                </IonCardContent>
            </IonCard>        
    );
  };

export default AudioQuestionRecorder