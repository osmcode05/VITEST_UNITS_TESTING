// asynchronous function
export function loadPrayerTimes(country = "Morocco", city = "Agadir") {
    
    if (typeof country !== "string" || typeof city !== "string")
    throw new Error("Invalid inputs");

  return new Promise(async (resolve, reject) => {

    const res = await fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}`,
    );

    if (res.status !== 200) {
      reject(new Error("Request failed whit status :" + res.status));
      return;
    }

    const { data } = await res.json();
  
    const prayerTimes = {
        Fajr: data.timings.Fajr,
        Dhuhr: data.timings.Dhuhr,
        Asr: data.timings.Asr,
        Maghrib: data.timings.Maghrib,
        Isha: data.timings.Isha,
    };
    resolve(prayerTimes);
  });
}