import React, { useState, useEffect } from "react";
type Props = {
    hours: number
}
const CountDownTimer = ({ hours }: Props) => {
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        let countdownTime = hours * 3600; // Convert hours to seconds
        const countdownInterval = setInterval(() => {
            if (countdownTime <= 0) {
                clearInterval(countdownInterval);
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
            } else {
                const remainingHours = Math.floor(countdownTime / 3600);
                const remainingMinutes = Math.floor((countdownTime % 3600) / 60);
                const remainingSeconds = countdownTime % 60;

                setTimeLeft({ hours: remainingHours, minutes: remainingMinutes, seconds: remainingSeconds });
                countdownTime--;
            }
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, [hours]);

    return (
        <div>
            <div>
                <span>{timeLeft.hours}</span>:
                <span>{timeLeft.minutes}</span>:
                <span>{timeLeft.seconds}</span>
            </div>
        </div>
    );
};

export default CountDownTimer;
