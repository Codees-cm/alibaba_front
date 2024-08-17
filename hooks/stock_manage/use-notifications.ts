
import React from "react";
import { useQuery , useMutation , useQueryClient } from "@tanstack/react-query";
// import { viewNotification } from "@/utils/api/notification";
import { fetchNotifications,createNotifications , editNotifications, viewNotifications ,deleteNotifications } from "@/utils/apis/notifications";
import { useToast } from "@/components/ui/use-toast"

export const useNotifications = (enable:boolean = false , id:number|null = null) => {
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const queryClient = useQueryClient();
    const { toast } = useToast()

    const {data:notifications , isLoading :allLoading ,error:allFetchError , refetch} = useQuery({
        queryKey : ['notifications'],
        queryFn: fetchNotifications,
        staleTime: 300000,
        enabled: !enable,
    })


    const {data:oneNotification , isLoading:singleLoading ,error:singleFetchError } = useQuery({
        queryKey : ['viewNotification',id],
        queryFn: viewNotifications,
        staleTime: 300000,
        enabled: !enable && id !== null,

    })

    const {mutate:addNotificationMutation, isPending:isAddingNotification} = useMutation({
        mutationFn: createNotifications,
        onSuccess: () => {
            queryClient.invalidateQueries(["notifications"])
            setIsSuccess(true);
            toast({
              title: "notification saved",
              description: "...........",
            })
          },
          onError: (error) => {
            setErrorMessage(error.message)
            toast({
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
            })
            // console.error("Error occurred during registration:", error);
          },
    })


    
    const {mutate:editNotificationMutation, isPending:isEditingNotification} = useMutation({
        mutationFn: editNotifications,
        onSuccess: () => {
            queryClient.invalidateQueries(["notifications"])
            toast({
              title: "notification edited",
              description: "...........",
            })
            setIsSuccess(true);
          },
          onError: (error) => {
            setErrorMessage(error.message)
            toast({
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
            })
            // console.error("Error occurred during registration:", error);
          },
    })


    const {mutate:deleteNotificationMutation, isPending:isDeletingNotification} = useMutation({
        mutationFn: deleteNotifications,
        onSuccess: () => {
            queryClient.invalidateQueries(["notifications"])
            toast({
              title: "notification deleted",
              description: "...........",
            })
            setIsSuccess(true);
          },
          onError: (error) => {
            setErrorMessage(error.message)
            toast({
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
            })
            // console.error("Error occurred during registration:", error);
          },
    })




    const addNotification = async (newNotification: any)=>{
            await  addNotificationMutation(newNotification); 
    }

    const modifyNotification = async (editNotification: any)=>{
        await  editNotificationMutation(editNotification); 
    }

    const deletingNotification = async (id: any)=>{
        await  deleteNotificationMutation(id); 
    }

    return {
        notifications,
        allLoading,
        allFetchError,

        oneNotification,
        singleLoading,
        singleFetchError,

        addNotification,
        isAddingNotification,

        
        modifyNotification,
        isEditingNotification,

        deletingNotification,
        isDeletingNotification,

        isSuccess,
        errorMessage,
    }


}

