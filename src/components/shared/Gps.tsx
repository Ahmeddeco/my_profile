"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, MapPin } from "lucide-react"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"

type Coordinates = {
	lat: number
	lng: number
}

type AddressDetails = {
	country: string
	state: string
	city: string
}

type Props = {
	country: {
		label?: string
		fieldKey?: string
		name: string
		defaultValue: string
		errors: string[] | undefined
	}
	state: {
		label?: string
		fieldKey?: string
		name: string
		defaultValue: string
		errors: string[] | undefined
	}
	city: {
		label?: string
		fieldKey?: string
		name: string
		defaultValue: string
		errors: string[] | undefined
	}
	lng: {
		label?: string
		fieldKey?: string
		name: string
		defaultValue: string
		errors: string[] | undefined
	}
	lat: {
		label?: string
		fieldKey?: string
		name: string
		defaultValue: string
		errors: string[] | undefined
	}
	cord?: Coordinates | null
}

async function fetchAddressFromCoords(lat: number, lng: number): Promise<AddressDetails | null> {
	try {
		const response = await fetch(
			`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=ar`,
			{
				headers: {
					"User-Agent": "AhmedApp/1.0",
				},
			},
		)

		if (!response.ok) throw new Error("فشل الاتصال بخادم الخرائط")

		const data = await response.json()
		const address = data.address

		if (!address) return null

		return {
			country: address.country ?? "",
			state: address.state ?? address.governorate ?? "",
			city: address.city ?? address.town ?? address.village ?? address.suburb ?? "",
		}
	} catch (error) {
		console.error("Reverse Geocoding Error:", error)
		return null
	}
}

export default function Gps({ cord, city, country, lat, lng, state }: Props) {
	const [coords, setCoords] = useState<Coordinates | null>(cord ?? null)
	const [address, setAddress] = useState<AddressDetails | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	// Controlled States للربط المباشر بالـ Inputs
	const [countryState, setCountryState] = useState(country.defaultValue ?? "")
	const [stateState, setStateState] = useState(state.defaultValue ?? "")
	const [cityState, setCityState] = useState(city.defaultValue ?? "")
	const [latState, setLatState] = useState<string | number>(coords?.lat ?? lat.defaultValue ?? "")
	const [lngState, setLngState] = useState<string | number>(coords?.lng ?? lng.defaultValue ?? "")

	const getMyLocation = useCallback(() => {
		if (!("geolocation" in navigator)) {
			toast.error("متصفحك لا يدعم خاصية تحديد الموقع")
			return
		}

		setIsLoading(true)

		const options: PositionOptions = {
			enableHighAccuracy: true,
			timeout: 10000,
			maximumAge: 0,
		}

		navigator.geolocation.getCurrentPosition(
			async (position) => {
				const newCoords = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				}

				setCoords(newCoords)
				setLatState(newCoords.lat)
				setLngState(newCoords.lng)

				try {
					const addressData = await fetchAddressFromCoords(newCoords.lat, newCoords.lng)

					if (addressData) {
						setAddress(addressData)
						if (addressData.country) setCountryState(addressData.country)
						if (addressData.state) setStateState(addressData.state)
						if (addressData.city) setCityState(addressData.city)
						toast.success("تم تحديد الموقع واستخراج العنوان بنجاح")
					} else {
						toast.warning("تم التقاط الإحداثيات، ولكن تعذر ترجمتها لعنوان مكتوب")
					}
				} catch (error) {
					toast.error("حدث خطأ أثناء جلب تفاصيل العنوان")
					console.error(error)
				} finally {
					setIsLoading(false)
				}
			},
			(err) => {
				setIsLoading(false)
				switch (err.code) {
					case err.PERMISSION_DENIED:
						toast.error("يرجى السماح بالوصول للموقع من إعدادات المتصفح")
						break
					case err.TIMEOUT:
						toast.error("استغرق طلب الموقع وقتاً طويلاً، حاول مجدداً")
						break
					default:
						toast.error("حدث خطأ أثناء تحديد الموقع")
				}
			},
			options,
		)
	}, [])

	return (
		<Card>
			<CardHeader>
				<CardTitle>GPS Location</CardTitle>
				<CardDescription>
					Press GPS button to fill the inputs fields via gps sensor, Or fill the data manually.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="grid gap-6 lg:grid-cols-3 grid-cols-2">
					{/* Country */}
					<Field>
						<FieldLabel>{country.label ?? "Country"}</FieldLabel>
						<Input
							name={country.name}
							value={countryState}
							type="text"
							onChange={(e) => setCountryState(e.target.value)}
						/>
						<FieldError>{country.errors}</FieldError>
					</Field>

					{/* State */}
					<Field>
						<FieldLabel>{state.label ?? "State"}</FieldLabel>
						<Input name={state.name} value={stateState} type="text" onChange={(e) => setStateState(e.target.value)} />
						<FieldError>{state.errors}</FieldError>
					</Field>

					{/* City */}
					<Field>
						<FieldLabel>{city.label ?? "City"}</FieldLabel>
						<Input name={city.name} value={cityState} type="text" onChange={(e) => setCityState(e.target.value)} />
						<FieldError>{city.errors}</FieldError>
					</Field>

					{/* Lng */}
					<Field>
						{/* <FieldLabel>{lng.label ?? "Longitude"}</FieldLabel> */}
						<Input
							name={lng.name}
							value={lngState}
							type="hidden"
							step="any"
							onChange={(e) => setLngState(e.target.value)}
						/>
						<FieldError>{lng.errors}</FieldError>
					</Field>

					{/* Lat */}
					<Field>
						{/* <FieldLabel>{lat.label ?? "Latitude"}</FieldLabel> */}
						<Input
							name={lat.name}
							value={latState}
							type="hidden"
							step="any"
							onChange={(e) => setLatState(e.target.value)}
						/>
						<FieldError>{lat.errors}</FieldError>
					</Field>
				</div>

				<Button onClick={getMyLocation} disabled={isLoading} type="button" size="lg" variant="outline">
					{isLoading ? <Loader2 className="animate-spin" /> : <MapPin />}
					{isLoading ? "جاري تحديد الموقع وقراءة العنوان..." : "تحديد موقعي الآن"}
				</Button>

				{address && (
					<h6 className="text-sm font-medium text-muted-foreground">
						{address.country} - {address.state} - {address.city}
					</h6>
				)}
			</CardContent>

			{coords && (
				<CardFooter className="px-4 lg:px-6">
					<iframe
						width="100%"
						height="100%"
						className="border-2 rounded-lg border-primary md:aspect-video aspect-square"
						loading="lazy"
						allowFullScreen
						referrerPolicy="no-referrer-when-downgrade"
						src={`https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=18&output=embed`}
					/>
				</CardFooter>
			)}
		</Card>
	)
}
