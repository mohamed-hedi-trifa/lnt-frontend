import React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="min-h-screen bg-muted/30">
            <div className="lg:ml-64">
                {/* Header Skeleton */}
                <header className="bg-background border-b border-border p-4 lg:p-6">
                    <div className="flex items-center space-x-4">
                        <Skeleton className="h-6 w-6 lg:hidden" />
                        <div>
                            <Skeleton className="h-8 w-64 mb-2" />
                            <Skeleton className="h-4 w-48" />
                        </div>
                    </div>
                </header>

                {/* Content Skeleton */}
                <div className="p-4 lg:p-6 space-y-6">
                    {/* KPI Cards Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[...Array(3)].map((_, i) => (
                            <Card key={i}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-4 w-4" />
                                </CardHeader>
                                <CardContent>
                                    <Skeleton className="h-8 w-20 mb-2" />
                                    <Skeleton className="h-3 w-24" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Tabs Skeleton */}
                    <div className="space-y-4">
                        <Skeleton className="h-10 w-full" />

                        {/* Cards Skeleton */}
                        {[...Array(4)].map((_, i) => (
                            <Card key={i}>
                                <CardContent className="pt-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <Skeleton className="h-5 w-3/4 mb-2" />
                                            <div className="flex gap-4">
                                                <Skeleton className="h-4 w-20" />
                                                <Skeleton className="h-4 w-24" />
                                                <Skeleton className="h-4 w-16" />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Skeleton className="h-6 w-16" />
                                            <Skeleton className="h-9 w-24" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
