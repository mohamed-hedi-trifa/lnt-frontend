import React from 'react'

export default function RightIcon() {
    return (
        <div>
            <style>
                {`
                  .right-icon svg {
                    width: 15px;
                    height: 24px;
                  }
                  @media (max-width: 768px) {
                    .right-icon svg {
                      width: 12px;
                      height: 18px;
                    }
                  }
                `}
            </style>
                <div className='right-icon'>
                    <svg viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd" 
                            clip-rule="evenodd" 
                            d="M13.7674 10.233C14.2355 10.7018 14.4985 11.3372 14.4985 11.9997C14.4985 12.6622 14.2355 13.2976 13.7674 13.7664L4.34071 23.1964C3.87172 23.6651 3.23572 23.9284 2.57262 23.9282C1.90952 23.9281 1.27365 23.6645 0.804877 23.1955C0.336107 22.7265 0.0728418 22.0905 0.0729981 21.4274C0.0731544 20.7643 0.336719 20.1285 0.80571 19.6597L8.46571 11.9997L0.80571 4.33969C0.350088 3.8684 0.0978002 3.23701 0.103185 2.58151C0.10857 1.92602 0.371196 1.29886 0.8345 0.835117C1.2978 0.371377 1.92471 0.108159 2.58021 0.102156C3.2357 0.0961527 3.86732 0.347845 4.33904 0.803023L13.769 10.2314L13.7674 10.233Z" 
                            fill="white"
                            stroke="black"
                            strokeWidth="0.5"
                         />
                    </svg>
                </div>      

        </div>
    )
}
