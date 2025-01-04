import React, { useEffect } from 'react'
import { Html5Qrcode, Html5QrcodeScanner } from 'html5-qrcode'

function PassActivity() {
useEffect(()=>{
    const scanner = new Html5QrcodeScanner('reader', {
        qrbox: {
            width: 250,
            height: 250,
        },
        fps: 5
    })
    scanner.render(success, error)
    
    function success(result) {
        scanner. clear()
        setScanResu1t(resu1t);
    }
    function error(err){
        console. warn (err) ;
    }

})

    return (
        <div>PassActivity
            <div id='reader'></div>
        </div>
    )
}

export default PassActivity