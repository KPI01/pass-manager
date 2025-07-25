import { toast } from "sonner";

export default function copyToClipboard(text: string, feedbackMsgs: { successMsg: string, error: string }) {
    return navigator.clipboard.writeText(text)
        .then(() => {
            console.log('Text copied to clipboard:', text);
            toast.success(feedbackMsgs.successMsg);
        })
        .catch(err => {
            console.error('Failed to copy text to clipboard:', err);
            toast.error(feedbackMsgs.error);
        });
}