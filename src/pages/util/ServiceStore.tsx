/** @format */
import { makeObservable, action, observable } from "mobx";
// import axios from "./axiosInterceptor";

const API_URL = "https://app.swipeswipe.co/admin/"
// const API_URL = "http://localhost:3002/admin/"


export default class ServiceStore {
	planList = null;


	constructor() {
		makeObservable(this, {
			GetAllData:observable,
			InsertData:action,
			UpdateData:action,
			GetDataByID:action,
			DeleteData:action,
			GetDataBYFilter:action,
		
		});
	}
	

	GetAllData = (method:any) => {
		// return axios
		// 	.get(method)
		// 	.then((response) => {
		// 		let data = [];
		// 		let error = "success";
		// 		if (response.status == 1) {
		// 			 error = "success";
		// 			  data = response.data;
		// 		} else {
		// 			error = "error";
		// 		}
		// 		return { data, error };
		// 	})
		// 	.catch((error) => {
		// 		return Promise.reject(error);
		// 	});
	};

	InsertData = async(method:any,data:any) => {
	  const requestOptions = {
		method: 'POST',
		headers: { 'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST',"Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
		body: JSON.stringify(data)
	};
	return await fetch(API_URL+method, requestOptions)
		.then(response => response.json())
		.then(datas =>{
		  return datas
		});
		
	};
	UpdateData = async(method:any,data:any) => {
	  const requestOptions = {
		method: 'PUT',
		headers: { 'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST',"Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
		body: JSON.stringify(data)
	};
	return await fetch(API_URL+method, requestOptions)
		.then(response => response.json())
		.then(datas =>{
		  return datas
		});
		
	};


	GetDataByID = async(method:any,id:any) => {
		
		return await fetch(API_URL+method+id)
			.then(response => response.json())
			.then(datas =>{
			  return datas
			});
			
		// return axios
		// 	.get(method+id)
		// 	.then((response) => {
		// 		let data = [];
		// 		let msg = "success";
		// 		if (response.status == 1) {
		// 			msg = "success";
		// 			  data = response.data;
		// 		} else {
		// 			msg = "error";
		// 		}
		// 		return { data, msg };
		// 	})
		// 	.catch((error) => {
		// 		return Promise.reject(error);
		// 	});
	};
	
	DeleteData = async(method:any,id:any) => {
		const requestOptions = {
			method: 'DELETE',
			headers: { 'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST',"Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
			
		};
		return await fetch(API_URL+method+id, requestOptions)
			.then(response => response.json())
			.then(datas =>{
			  return datas
			});
		// return axios
		// 	.delete(method+id)
		// 	.then((response) => {
		// 		let data = [];
		// 		let msg = "success";
		// 		if (response.status == 1) {
		// 			msg = "success";
		// 			  data = response.data;
		// 		} else {
		// 			msg = "error";
		// 		}
		// 		return { data, msg };
		// 	})
		// 	.catch((error) => {
		// 		return Promise.reject(error);
		// 	});
	};

	GetDataBYFilter = async(method:any,data:any) => {
		const requestOptions = {
			method: 'POST',
			headers: { 'Access-Control-Allow-Credentials': 'true','Access-Control-Allow-Methods':'POST',"Content-type": "application/json", "Access-Control-Allow-Origin":"*" },
			body: JSON.stringify(data)
		};
		return await fetch(API_URL+method, requestOptions)
			.then(response => response.json())
			.then(datas =>{
			  return datas
			});
		
	};



	
	
	


	

	

	
	
	

}