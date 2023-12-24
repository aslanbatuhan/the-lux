document.addEventListener("DOMContentLoaded", function () {
    // Get all input fields
    const inputFields = document.querySelectorAll("#form input, #form select");

    // Get the submit button
    const submitButton = document.querySelector("#form button");

    // Add event listener to each input field
    inputFields.forEach(function (input) {
        input.addEventListener("input", function () {
            // Check if all input fields have values
            const allFieldsFilled = Array.from(inputFields).every(function (field) {
                return field.value.trim() !== "";
            });

            // Enable or disable the submit button based on the result
            submitButton.disabled = !allFieldsFilled;
        });
    });
});


let loginForm = document.getElementById("form");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let distance = document.getElementById("distance").value;
    let ybsbDistance = document.getElementById("ybsbDistance").value;
    let ledDistance = document.getElementById("ledDistance").value;
    let ledWatt = document.getElementById("ledWatt").value;
    let ledCost = document.getElementById("ledCost").value;
    let ybsbWatt = document.getElementById("ybsbWatt").value;
    let ybsbCost = document.getElementById("ybsbCost").value;
    let height = document.getElementById("height").value;
    let choice = document.getElementById("choice").value;


    let ledArmaturCount = (distance/ledDistance) + 1;
    let ybsbArmaturCount = (distance/ybsbDistance) + 1;
    let ybsbEnergyCost = ybsbWatt * 3.6 * 3.89 * ybsbArmaturCount * choice;
    let ybsbBroken = ybsbArmaturCount * 0.012;
    let bulbForYear = ybsbBroken * 450;
    let ybsbForYear = ybsbEnergyCost + bulbForYear;
    let ybsbChancing = ybsbArmaturCount*ybsbCost;
    let ledTotalCost = ledArmaturCount*ledCost;
    
    let poleCost;


    switch(height) {
        case "8":
            poleCost = ledArmaturCount * 2740;
          break;
        case "9":
            poleCost = ledArmaturCount * 3570;
          break;
        case "10":
            poleCost = ledArmaturCount * 4180;
          break;
    };


    let totalLed = poleCost + ledTotalCost;
    let ledEnergyForYear = ledWatt * 3.6 * 3.89 * ledArmaturCount * choice;
    let brokenLed = ledArmaturCount * 0.007 * choice;
    let brokenLedCostForYear = brokenLed * ledCost + 2000;
    let ledForYear = ledEnergyForYear + brokenLedCostForYear;
    

    let ybsbCostForYear = 0;
    let investForYear = 0;

    while(totalLed >= ybsbCostForYear) {
        
        if(investForYear%6 == 5) {
            ybsbCostForYear += ybsbChancing;
        }

        ybsbCostForYear += ybsbForYear;

        totalLed += ledForYear;

        investForYear += 1;

        if(investForYear%20 == 0) {
            ledForYear = ledArmaturCount * ledCost * 0.5;
        }

        bulbForYear *= 1.04;

        brokenLedCostForYear *= 0.96;

        ledForYear = ledEnergyForYear + brokenLedCostForYear;

        ybsbForYear = ybsbEnergyCost + bulbForYear;
    }

    let profit = parseInt(ybsbForYear - ledForYear + 800000);
    
    document.getElementById("investForYear").innerHTML = investForYear;
    document.getElementById("profit").innerHTML = profit;
    document.getElementById("year-text").style.display = "block";
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  });



  /*

  ampul_yillik = ampul_yillik * 1.04;
        yillik_bozulan_led_ucreti = yillik_bozulan_led_ucreti * 0.96;
        led_yillik = led_yillik_enerji_ucreti + yillik_bozulan_led_ucreti;
        yillik = enerji + ampul_yillik;
    int direk_ucreti;

    if (direk_yuksekligi == 8) {
        direk_ucreti = armatur_sayisiled * 2740;
    } else if (direk_yuksekligi == 9) {
        direk_ucreti = armatur_sayisiled * 3570;
    } else if (direk_yuksekligi == 10) {
        direk_ucreti = armatur_sayisiled * 4180;
    } else {
        printf("Hata: Geçersiz direk yüksekliği\n");
        return 1;
    }

    int total_led = direk_ucreti + led_maliyet;
    int led_yillik_enerji_ucreti = led_w * 10 * 360 / 1000 * 3.89 * armatur_sayisiled * armatur_sayisi;
    int led_bozulan = armatur_sayisiled * 0.007 * 2;
    int yillik_bozulan_led_ucreti = led_bozulan * led_ucret + 2000;
    int led_yillik = led_yillik_enerji_ucreti + yillik_bozulan_led_ucreti;

    int yillik_sodyum_buharli_ucreti = 0;
    int yatirim_yili = 0;

    while (total_led >= yillik_sodyum_buharli_ucreti) {
        // Yılda bir kez 6 yılda bir değişim yapılır.
        if (yatirim_yili % 6 == 5) {
            yillik_sodyum_buharli_ucreti += ybsbdegisim;
        }

        yillik_sodyum_buharli_ucreti += yillik;

        // LED armatür maliyeti her yıl eklenir.
        total_led += led_yillik;

        yatirim_yili++;

        // Her yılın başında yapılacak işlemler
        if (yatirim_yili % 20 == 0) {
            led_yillik += armatur_sayisiled * led_ucret * 0.5;
        }

        
       
    }


    printf("LED armatürün kurulum ücretini %d yılda amorti edebilirsiniz.\n", yatirim_yili);
    printf("LED armatürlerin amorti ardından ortalama olarak yıllık karı = %d TL\n", yillik - led_yillik + 800000);

    return 0;
}


  */