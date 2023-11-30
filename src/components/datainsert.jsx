import React from 'react'
import { useEffect } from 'react'
import { API } from '../API/apis.ts'
import axios from 'axios'
import Cookies from 'js-cookie';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;
export const Datainsert = () => {
    const addData = ()=>{
        var counter = 103
        const firstNames = ["John", "Jane", "Michael", "Sarah", "David", "Emily", "Daniel", "Emma", "Christopher", "Olivia"];
        const lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor"];
        let indian_parents_fnames = [
            "Aarav",
            "Aishwarya",
            "Vikram",
            "Priya",
            "Rahul",
            "Deepika",
            "Raj",
            "Ananya",
            "Arjun",
            "Kavita"
        ]
        const indianSurnames = ["Patel", "Sharma", "Singh", "Desai", "Reddy", "Chatterjee", "Mehta", "Kapoor", "Nair", "Verma"];
        const randomMobileNumbers = generateRandomMobileNumbers(100);
        const randomDatesOfBirth = generateRandomDatesOfBirth(100);
        var c=0;
        const apis = new API();
        console.log(randomDatesOfBirth);
        for (var i=0;i<10;i++){
            for (var j=0;j<10;j++){
                var cid = (i%2===0?1:2);
                var course = (i%2===0?"Class 6":"Class 7")
                // let data ={
                //     "email":indian_parents_fnames[i]+indianSurnames[j]+"@gmail.com",
                // "fname" : indian_parents_fnames[i],
                // "lname":indianSurnames[j],
                // "dob":randomDatesOfBirth[c],
                // "phone": randomMobileNumbers[c],
                // "mobile": randomMobileNumbers[c],
                // "pr_id":1000+counter,
                // "status":true,
                // "password":indian_parents_fnames[i]+indianSurnames[j]+"@12345",
                // "designation":"Parent"
                // }
                // let data = {
                //     "Name": firstNames[i]+" "+lastNames[j],
                //     "RollNo": counter,
                //     "Class":course,
                //     "Reportsto": firstNames[j]+" "+lastNames[i],
                //     "email": firstNames[i]+"."+lastNames[j]+"@gmail.com",
                //     "fname": firstNames[i],
                //     "lname": lastNames[j],
                //     "dob": randomDatesOfBirth[c],
                //     "phone": randomMobileNumbers[c],
                //     "mobile": randomMobileNumbers[c],
                //     "p_id": 1000+counter,
                //     "status": true,
                //     "password": firstNames[i]+lastNames[j]+"@12345",
                //     "designation": "student",
                //     "c_id": cid,
                //     "Percentage":Math.floor(Math.random() * 100) + 1
                // }
                let registerdata = {
                    "username": counter,
                    "email": firstNames[i]+"."+lastNames[j]+"@gmail.com",
                    "first_name": firstNames[i],
                    "last_name": lastNames[j],
                    "password": firstNames[i]+lastNames[j]+"@12345",
                    "password2": firstNames[i]+lastNames[j]+"@12345"
                }
                apis.registerUser(registerdata).then((res)=>{
                    console.log(res);
                }).catch((err)=>{
                    console.log(err);
                })
                c++;
                counter++;
            }
        }

        console.log(randomMobileNumbers);
    }
    function generateRandomMobileNumber() {
        const countryCode = "+1"; // You can change the country code as needed
        const randomNumber = Math.floor(Math.random() * 9000000000) + 1000000000; // Generates a 10-digit random number
    
        return `${countryCode}${randomNumber}`;
    }
    
    function generateRandomMobileNumbers(numNumbers) {
        const mobileNumbers = [];
    
        for (let i = 0; i < numNumbers; i++) {
            mobileNumbers.push(generateRandomMobileNumber());
        }
    
        return mobileNumbers;
    }
    function generateRandomDateOfBirth() {
        const startYear = 1950; // You can customize the start year
        const endYear = 2003;   // You can customize the end year
        const randomYear = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
        const randomMonth = Math.floor(Math.random() * 12) + 1; // Months are 1-indexed
        const randomDay = Math.floor(Math.random() * 28) + 1;    // Assuming all months have 28 days
    
        const formattedMonth = (randomMonth < 10) ? `0${randomMonth}` : `${randomMonth}`;
        const formattedDay = (randomDay < 10) ? `0${randomDay}` : `${randomDay}`;
    
        return `${formattedMonth}/${formattedDay}/${randomYear}`;
    }
    
    function generateRandomDatesOfBirth(numDates) {
        const datesOfBirth = [];
    
        for (let i = 0; i < numDates; i++) {
            datesOfBirth.push(generateRandomDateOfBirth());
        }
    
        return datesOfBirth;
    }
    
    // Example: Generate 100 random dates of birth
    
    
    // Example: Generate 5 random mobile numbers
    
    

    const test = async () =>{
        try {
            const { data: response } = await axios.post("http://127.0.0.1:8000/login",{
                "username": 101,
                "password": "ADMIN@12345"
            }) ;
            console.log(response);
            try {
                const { data: res } = await axios.get("http://127.0.0.1:8000/students",{headers: {
                    'Authorization':"Token "+response.token
                }}) ;
                console.log();
            } catch (error) {
                console.error(error.message);
            }
        } catch (error) {
            console.error(error.message);
        }
        
    }
    console.log(Cookies.get('sessionid'))
  return (<>
    <div onClick={addData}>datainsert</div>
    <div onClick={test}>test</div></>
  )
}
