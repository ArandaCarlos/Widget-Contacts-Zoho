const ValidateContact = (props) => {
    let response = false;
        const nro_completo= props;
        
        if(nro_completo.includes("+54"))
        {
            const nro = nro_completo.substr(3);
            if(nro.length == 10)
            {
                const codigos = [11,348,220,221,223,230,236,237,249,260,261,263,264,266,280,291,294,297,298,299,336,341,342,343,345,348,351,353,358,362,3732,370,376,379,380,381,383,385,387,388,2202,2221,2223,2224,2225,2226,2227,2229,2241,2242,2243,2244,2245,2246,2252,2254,2255,2257,2261,2262,2264,2265,2266,2267,2268,2271,2272,2273,2274,2281,2283,2284,2285,2286,2291,2292,2296,2297,2302,2314,2316,2317,2320,2323,2324,2325,2326,2331,2333,2334,2335,2336,2337,2338,2342,2343,2344,2345,2346,2352,2353,2354,2355,2356,2357,2358,2392,2393,2394,2395,2396,2473,2474,2475,2477,2478,2622,2624,2625,2626,2646,2647,2648,2651,2652,2655,2656,2657,2658,2901,2902,2903,2920,2921,2922,2923,2924,2925,2926,2927,2928,2929,2931,2932,2933,2934,2935,2936,2940,2942,2945,2946,2948,2952,2953,2954,2962,2963,2964,2966,2972,2982,2983,3327,3329,3382,3385,3387,3388,3400,3401,3402,3404,3405,3406,3407,3408,3409,3435,3436,3437,3438,3442,3444,3445,3446,3447,3454,3455,3456,3458,3460,3462,3463,3464,3465,3466,3467,3468,3469,3471,3472,3476,3482,3483,3487,3489,3491,3492,3493,3496,3497,3498,3521,3522,3524,3525,3532,3533,3537,3541,3542,3543,3544,3546,3547,3548,3549,3562,3563,3564,3571,3572,3573,3574,3575,3576,3582,3583,3584,3585,3711,3715,3716,3718,3721,3725,3731,3734,3735,3741,3743,3751,3754,3755,3756,3757,3758,3772,3773,3774,3775,3777,3781,3782,3786,3821,3825,3826,3827,3832,3835,3837,3838,3841,3843,3844,3845,3846,3854,3855,3856,3857,3858,3861,3862,3863,3865,3867,3868,3869,3873,3876,3877,3878,3885,3886,3889,3888,3891,3892,3894];
                let found = false;
                codigos.forEach(cod => {
                    if(nro.startsWith(cod))
                    {
                        found = true;
                    }
                });
                if(found)
                {
                    response = true;
                }
                else
                {
                    response = false;
                }
            }
            else if(nro.length == 11 && nro.startsWith("9"))
            {
                const codigos = [911,9348,9220,9221,9223,9230,9236,9237,9249,9260,9261,9263,9264,9266,9280,9291,9294,9297,9298,9299,9336,9341,9342,9343,9345,9348,9351,9353,9358,9362,93732,9370,9376,9379,9380,9381,9383,9385,9387,9388,92202,92221,92223,92224,92225,92226,92227,92229,92241,92242,92243,92244,92245,92246,92252,92254,92255,92257,92261,92262,92264,92265,92266,92267,92268,92271,92272,92273,92274,92281,92283,92284,92285,92286,92291,92292,92296,92297,92302,92314,92316,92317,92320,92323,92324,92325,92326,92331,92333,92334,92335,92336,92337,92338,92342,92343,92344,92345,92346,92352,92353,92354,92355,92356,92357,92358,92392,92393,92394,92395,92396,92473,92474,92475,92477,92478,92622,92624,92625,92626,92646,92647,92648,92651,92652,92655,92656,92657,92658,92901,92902,92903,92920,92921,92922,92923,92924,92925,92926,92927,92928,92929,92931,92932,92933,92934,92935,92936,92940,92942,92945,92946,92948,92952,92953,92954,92962,92963,92964,92966,92972,92982,92983,93327,93329,93382,93385,93387,93388,93400,93401,93402,93404,93405,93406,93407,93408,93409,93435,93436,93437,93438,93442,93444,93445,93446,93447,93454,93455,93456,93458,93460,93462,93463,93464,93465,93466,93467,93468,93469,93471,93472,93476,93482,93483,93487,93489,93491,93492,93493,93496,93497,93498,93521,93522,93524,93525,93532,93533,93537,93541,93542,93543,93544,93546,93547,93548,93549,93562,93563,93564,93571,93572,93573,93574,93575,93576,93582,93583,93584,93585,93711,93715,93716,93718,93721,93725,93731,93734,93735,93741,93743,93751,93754,93755,93756,93757,93758,93772,93773,93774,93775,93777,93781,93782,93786,93821,93825,93826,93827,93832,93835,93837,93838,93841,93843,93844,93845,93846,93854,93855,93856,93857,93858,93861,93862,93863,93865,93867,93868,93869,93873,93876,93877,93878,93885,93886,93889,93888,93891,93892,93894];
                let found = false;
                codigos.forEach(cod => {
                    if(nro.startsWith(cod))
                    {
                        found = true;
                    }
                });
                if(found)
                {
                    response = true;
                }
                else
                {
                    response = false;
                }
            }
            else
            {
                response = false;
            }
        }
        //BRASIL
        if(nro_completo.includes("+55"))
        {
            const nro = nro_completo.substr(3);
            const x = nro.substr(2,1);
            if(nro.length == 10 && x !== "9")
            {
                const codigos = [11,21,31,51,41,85,61,71,81,19,62,16,12,48,17,83,84,15,21,11,91,27,13,12,79,92,27,71,32,43,54,82,34,67,34,65,86,44,11,47,16,21,47,21,14,24,83,51,19,14,41,19,47,81,98,11,81,31,13,22,19,69,81,21,13,11,38,51,62,64,12,11,91,12,77,95,22,44,75,45,19,21,47,21,21,21,22,14,84,19,24,73,69,24,68,22,93,21,11,19,21,21,19,61,21,77,15,19,11,10,19,16,27,22,45,73,11,11,66,33,11,99,84,67,18,35,42,87,15,47,31,33,99,18,54,47,48,53,96,35,48,13,19,51,48,52,27,41,41,12,51,51,16,16,19,11];
                let found = false;
                codigos.forEach(cod => {
                    if(nro.startsWith(cod))
                    {
                        found = true;
                    }
                });
                if(found)
                {
                    response=true;
                }
                else
                {
                    response=false;
                }
            }
            else if(nro.length == 11 && x == "9")
            {
                const codigos = [119,219,319,519,419,859,619,719,819,199,629,169,129,489,179,839,849,159,219,119,919,279,139,129,799,929,279,719,329,439,549,829,349,679,349,659,869,449,119,479,169,219,479,219,149,249,839,519,199,149,419,199,479,819,989,119,819,319,139,229,199,699,819,219,139,119,389,519,629,649,129,119,919,129,779,959,229,449,759,459,199,219,479,219,219,219,229,149,849,199,249,739,699,249,689,229,939,219,119,199,219,219,199,619,219,779,159,199,119,199,169,279,229,459,739,119,119,669,339,119,999,849,679,189,359,429,879,159,479,319,339,999,189,549,479,489,539,969,359,489,139,199,519,489,529,279,419,419,129,519,519,169,169,199,119];
                let found = false;
                codigos.forEach(cod => {
                    if(nro.startsWith(cod))
                    {
                        found = true;
                    }
                });
                if(found)
                {

                    response=true;
                }
                else
                {
                    response=false;
                }
            }
            else
            {
                response=false;
            }
        }
        //CHILE
        if(nro_completo.includes("+56"))
        {
            const nro = nro_completo.substr(3);
            if(nro.length == 9 && !nro.startsWith("9"))
            {
                const codigos = [32,2,41,55,51,57,72,451];
                let found = false;
                codigos.forEach(cod => {
                    if(nro.startsWith(cod))
                    {
                        found = true;
                    } 
                });
                if(found)
                {

                    response=true;
                }
                else
                {
                    response=false;
                }
            }
            else if(nro.length == 9 && nro.startsWith("9"))
            {
                response=true;
            }
            else
            {
                response=false;
            }
        }
        //MEXICO
        if(nro_completo.includes("+52"))
        {
            const nro = nro_completo.substr(3);
            if(nro.length == 10)
            {
                const codigos = [33,35,41,55,56,74,81,221,222,228,229,241,246,271,311,312,314,315,322,341,351,442,427,443,444,446,449,452,457,461,462,464,473,477,492,612,614,618,624,629,644,646,656,661,662,664,665,667,668,669,686,715,722,744,755,771,777,777,833,834,844,866,867,868,871,871,899,921,951,961,962,963,981,984,984,993,998,999,415,726,55,938,961,631,971];
                let found = false;
                codigos.forEach(cod => {
                    if(nro.startsWith(cod))
                    {
                        found = true;
                    }
                });
                if(found)
                {

                    response=true;
                }
                else
                {
                    response=false;
                }
            }
            else if(nro.length==11 && nro.startsWith(1)){
                const codigos = [133,135,141,155,156,174,181,1221,1222,1228,1229,1241,1246,1271,1311,1312,1314,1315,1322,1341,1351,1427,1442,1443,1444,1446,1449,1452,1457,1461,1462,1464,1473,1477,1492,1612,1614,1618,1624,1629,1644,1646,1656,1661,1662,1664,1665,1667,1668,1669,1686,1715,1722,1744,1755,1771,1777,1777,1833,1834,1844,1866,1867,1868,1871,1871,1899,1921,1951,1961,1962,1963,1981,1984,1984,1993,1998,1999,1415,1726,155,1938,1961,1631,1971];
                let found = false;
                codigos.forEach(cod => {
                    if(nro.startsWith(cod))
                    {
                        found = true;
                    }
                });
                if(found)
                {

                    response=true;
                }
                else
                {
                    response=false;
                }
            }else{
                response=false;
            }
        }
        //COLOMBIA
        if(nro_completo.includes("+57"))
        {
            const nro = nro_completo.substr(3);
            if(nro.length == 8 && !nro.startsWith("3"))
            {
                const codigos = [1,5,4,2,7,6,8];
                let found = false;
                codigos.forEach(cod => {
                    if(nro.startsWith(cod))
                    {
                        found = true;
                    } 
                });
                if(found)
                {

                    response=true;
                }
                else
                {
                    response=false;
                }
            }
            else if(nro.length == 10 && nro.startsWith("3"))
            {
                response=true;
            }
            else
            {
                response=false;
            }
        }
        //COSTA RICA
        if(nro_completo.includes("+506"))
        {
            const nro= nro_completo.substr(4);
            if(nro.length == 8 && !nro.startsWith("6") && !nro.startsWith("7") && !nro.startsWith("8"))
            {
                const codigos = [22];
                let found = false;
                codigos.forEach(cod => {
                    if(nro.startsWith(cod))
                    {
                        found = true;
                    }
                });
                if(found)
                {

                    response=true;
                }
                else
                {
                    response=false;
                }
            }
            else if(nro.length == 8 && (nro.startsWith("6") || nro.startsWith("7") || nro.startsWith("8")))
            {
                response=true;
            }
            else
            {
                response=false;
            }
        }
        //ECUADOR
        if(nro_completo.includes("+593"))
        {
            const nro=nro_completo.substr(4);
            if(nro.length == 8 && !nro.startsWith("9"))
            {
                const codigos = [2,4];
                let found = false;
                codigos.forEach(cod => {
                    if(nro.startsWith(cod))
                    {
                        found = true;
                    }
                });
                if(found)
                {

                    response=true;
                }
                else
                {
                    response=false;
                }
            }
            else if(nro.length == 9 && (nro.startsWith("9")))
            {
                response=true;
            }
            else
            {
                response=false;
            }
        }
        //PERU
        if(nro_completo.includes("+51"))
        {
            const nro=nro_completo.substr(3);
            if(nro.length == 8 && !nro.startsWith("9"))
            {
                const codigos = [74,73,44,54,84,1];
                let found = false;
                codigos.forEach(cod => {
                    if(nro.startsWith(cod))
                    {
                        found = true;
                    }
                });
                if(found)
                {
                    response=true;
                }
                else
                {
                    response=false;
                }
            }
            else if(nro.length == 9 && nro.startsWith("9"))
            {
                response=true;
            }
            else
            {
                response=false;
            }
        }
        //URUGUAY
        if(nro_completo.includes("+598"))
        {
            const nro = nro_completo.substr(4);
            if(nro.length == 8 && !nro.startsWith("9"))
            {
                const codigos = [2,42,33];
                let found = false;
                codigos.forEach(cod => {
                    if(nro.startsWith(cod))
                    {
                        found = true;
                    }
                });
                if(found)
                {
                    response=true;
                }
                else
                {
                    response=false;
                }
            }
            else if(nro.length == 8 && nro.startsWith("9"))
            {
                response=true;
            }
            else
            {
                response=false;
            }
        }

    return ( 
        response
     );
}
 
export default ValidateContact;

