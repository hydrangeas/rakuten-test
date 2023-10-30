import Map from "@/components/Map";
import React from "react";
import { MarkerF } from "@react-google-maps/api";
import { Hotel } from "@/types/Hotel";

export default async function Home() {
  const appId = process.env.APP_ID;
  let hotels: Hotel[] = [];
  await fetch(
    "https://app.rakuten.co.jp/services/api/Travel/SimpleHotelSearch/20170426?format=json&largeClassCode=japan&middleClassCode=okinawa&smallClassCode=nahashi&datumType=1&applicationId=" +
      appId
  )
    .then((response) => response.json())
    .then((data) => {
      data.hotels.forEach((internalHotel: any) => {
        let hotel: Hotel = {
          hotelNo: 0,
          hotelName: "",
          reviewAverage: 0,
          reviewCount: 0,
          latitude: 0,
          longitude: 0,
        };
        hotel.hotelNo = Number(internalHotel.hotel[0].hotelBasicInfo.hotelNo);
        hotel.hotelName = String(
          internalHotel.hotel[0].hotelBasicInfo.hotelName
        );
        hotel.reviewAverage = Number(
          internalHotel.hotel[0].hotelBasicInfo.reviewAverage
        );
        hotel.reviewCount = Number(
          internalHotel.hotel[0].hotelBasicInfo.reviewCount
        );
        hotel.latitude = Number(internalHotel.hotel[0].hotelBasicInfo.latitude);
        hotel.longitude = Number(
          internalHotel.hotel[0].hotelBasicInfo.longitude
        );
        hotels.push(hotel);
      });
    });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Map hotels={hotels} />
      <table className="table-auto">
        <thead>
          <tr>
            <th>hotelNo</th>
            <th>hotelName</th>
            <th>reviewAverage (reviewCount)</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel.hotelNo}>
              <td>{hotel.hotelNo}</td>
              <td>{hotel.hotelName}</td>
              <td>
                {hotel.reviewAverage} ({hotel.reviewCount})
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
