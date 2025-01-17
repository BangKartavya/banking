"use client";

import React, {useState} from 'react';
import Image from "next/image";
import Link from "next/link";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button"
import {
	Form,
} from "@/components/ui/form";
import CustomInput from "@/components/CustomInput";
import {authFormSchema} from "@/lib/utils";
import {Loader2} from "lucide-react";
import {useRouter} from "next/navigation";


const AuthForm = ({type}: AuthFormProps) => {
	const [user, setUser] = useState(null);
	const [isloading, setisloading] = useState(false);
	const router = useRouter();

	const formSchema = authFormSchema(type);

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
			firstName: "",

			lastName: "",
			address1: "",
			postalcode: "",

			dateOfBirth: "",
			aadhar: "",
			state: "",

			city: ""
		},
	})

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		setisloading(true);
		try {
			// Sign up with appwrite and create plaid token

			if (type === "sign-up") {
				/*
				const newUser = await signUp(data);

				setUser(newUser);
				*/

			} else {
				/*
				const response = await signIn({
					email: data.email,
					password: data.password
				});

				if (response) router.push("/");
				*/
			}

		} catch (error) {
			console.log(error);
		} finally {
			setisloading(false);
		}
	}

	return (
		<section className="auth-form">
			<header className="flex flex-col gap-5 md:gap-8">
				<Link href="/" className="cursor-pointer flex items-center gap-1">
					<Image
						src="/icons/logo.svg"
						alt="logo"
						width={34}
						height={34}
					/>
					<h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Horizon</h1>
				</Link>
				<div className="flex flex-col ga-1 md:gap-3">
					<h1 className="text-24 lg:text-36 font-semibold text-gray-900">
						{user ?
							"Link Account"
							: type === "sign-in" ? "Sign In" : "Sign Up"
						}
						<p className="text-16 font-normal text-gray-600">
							{user ?
								"Link Your Account to get Started"
								: "Please Enter your Details"
							}
						</p>
					</h1>
				</div>
			</header>
			{user ? (
				<div className="flex flex-col gap-4">
					{/*TODO PlaidLink*/}
				</div>
			) : (
				<>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							{type === "sign-up" && (
								<>
									<div className="flex gap-4">
										<CustomInput
											control={form.control}
											name="firstName"
											label="First Name"
											placeholder="First Name"
										/>
										<CustomInput
											control={form.control}
											name="lastName"
											label="Last Name"
											placeholder="Last Name"
										/>
									</div>

									<CustomInput
										control={form.control}
										name="address1"
										label="Address"
										placeholder="Address"
									/>
									<CustomInput
										control={form.control}
										name="city"
										label="City"
										placeholder="Bhopal"
									/>
									<div className="flex gap-4">
										<CustomInput
											control={form.control}
											name="state"
											label="State"
											placeholder="Chandigarh"
										/>
										<CustomInput
											control={form.control}
											name="postalcode"
											label="PIN Code"
											placeholder="160012"
										/>
									</div>
									<div className="flex gap-4">
										<CustomInput
											control={form.control}
											name="dateOfBirth"
											label="Date of Birth"
											placeholder="MM/DD/YYYY"
										/>
										<CustomInput
											control={form.control}
											name="aadhar"
											label="Aadhar Number"
											placeholder="123412341234"
										/>
									</div>
								</>
							)}
							<CustomInput
								control={form.control}
								name="email"
								label="Email"
								placeholder="Enter your email"
							/>
							<CustomInput
								control={form.control}
								name="password"
								label="Password"
								placeholder="Enter your password"
							/>
							<div className="flex flex-col gap-4">
								<Button type="submit" className="form-btn" disabled={isloading}>
									{isloading ? (
										<>
											<Loader2 size={20} className="animate-spin"/> &nbsp; Loading...
										</>
									) : (
										type === "sign-in" ? "Sign In" : "Sign Up"
									)}
								</Button>
							</div>
						</form>
					</Form>
					<footer className="flex justify-center gap-1">
						<p className="text-14 font-normal text-gray-600">
							{type === "sign-in" ?
								"Don't have an account?" :
								"Already have an account?"
							}
						</p>
						<Link
							href={type === "sign-in" ? "/sign-up" : "/sign-in"}
							className="form-link"
						>
							{type === "sign-in" ? "Sign Up" : "Sign In"}
						</Link>
					</footer>
				</>
			)}
		</section>
	);
};

export default AuthForm;