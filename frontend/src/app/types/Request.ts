export interface transportByDestinationDto {
    ID:string;
    IDNumber :      string;
    Name :          string;
    Surname :      string;
    CellphoneNumber: string;
    SchoolName :     string;
}

export interface chilRequestStatusDto{
    ID:          number
	Name:        string
	Surname:     string
	Allergy:     string
	PickUp:      string
	Destination: string
	Status:      string
}

export interface AcceptRequestDto{
    childId: string
    driverId:string
}