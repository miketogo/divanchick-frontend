export function PhoneIcon({ mainClassName, fillClassName }) {
    return (
        <svg
            width={21}
            height={20}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={mainClassName}
            viewBox="0 0 21 20"
        >
            <path
                d="M6.35 4.167c.05.741.175 1.466.375 2.158l-1 1c-.342-1-.558-2.058-.633-3.158H6.35zm8.217 10.016c.708.2 1.433.325 2.166.375V15.8a12.856 12.856 0 01-3.166-.625l1-.992zM7.15 2.5H4.233a.836.836 0 00-.833.833C3.4 11.158 9.742 17.5 17.567 17.5a.836.836 0 00.833-.833v-2.909a.836.836 0 00-.833-.833 9.506 9.506 0 01-2.975-.475.7.7 0 00-.259-.042.854.854 0 00-.591.242l-1.834 1.833a12.624 12.624 0 01-5.491-5.491L8.25 7.158a.836.836 0 00.208-.85 9.467 9.467 0 01-.475-2.975.836.836 0 00-.833-.833z"
                fill="#D4171E"
                className={mainClassName}
            />
        </svg>
    );
}


export function CartIcon({ mainClassName, strokeClassName }) {
    return (
        <svg
            width={21}
            height={20}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={mainClassName}
            viewBox="0 0 21 20"
        >
            <path
                d="M3.146 3.583L2.443 1.25H.1m3.046 2.333l2.813 9.334h12.89v-7a2.339 2.339 0 00-2.343-2.334H3.146zm13.36 15.167a1.17 1.17 0 01-1.172-1.167 1.17 1.17 0 011.172-1.166 1.17 1.17 0 011.172 1.166 1.17 1.17 0 01-1.172 1.167zM7.13 17.583a1.17 1.17 0 011.172-1.166 1.17 1.17 0 011.172 1.166 1.17 1.17 0 01-1.172 1.167 1.17 1.17 0 01-1.172-1.167z"
                stroke="#D4171E"
                strokeWidth={1.25}
                className={strokeClassName}
            />
        </svg>
    );
}
