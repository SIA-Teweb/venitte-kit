export enum OrderItemStatusEnum {
	OnTheWay = 'onTheWay',
	Delivered = 'delivered',
	Ordered = 'ordered',
	New = 'new',
	Done = 'done',
	Cancelled = 'cancelled'
}

export enum OrderPaidStatusEnum {
	Paid = 'paid',
	NotPaid = 'notPaid'
}

export enum OrderStatusEnum {
	New = 'new',
	InProgress = 'inProgress',
	Done = 'done',
	Cancelled = 'cancelled'
}

export enum OrderDeliveryTypeEnum {
	Courier = 'courier',
	Service = 'service',
	TakeAway = 'takeAway'
}

export enum OrderStatusColorsEnum {
	New = 'bg-primary-500',
	Primary = 'bg-tertiary-600',
	Waiting = 'bg-warning-700',
	Completed = 'bg-success-700',
	Canceled = 'bg-error-700'
}
