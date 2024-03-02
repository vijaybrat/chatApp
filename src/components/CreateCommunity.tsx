import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Spinner,
} from "@nextui-org/react";
import {
  database,
  DATABASE_ID,
  COMMUNITY_COLLEXTION_ID,
} from "../config/appwriteConfig";
import { useState } from "react";
import { AppwriteException } from "appwrite";
import { toast } from "react-toastify";
import { communityStore } from "../state/communityStore";
import { ID } from "appwrite";

export default function CreateCommunity() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const communitystate = communityStore();

  const handleSubmit = () => {
    setLoading(true);
    console.log("Submitting community with name:", name); // Log the community name
    database
      .createDocument(DATABASE_ID, COMMUNITY_COLLEXTION_ID, ID.unique(), {
        name: name,
      })
      .then((res) => {
        console.log("Community added successfully:", res); // Log the response
        communitystate.addCommunity(res);
        setLoading(false);
        toast.success("Community added successfully", { theme: "colored" });
      })
      .catch((err: AppwriteException) => {
        setLoading(false);
        console.error("Error adding community:", err); // Log the error
        toast.error(err.message, { theme: "colored" });
      });
  };

  return (
    <>
      <Button onPress={onOpen} color="danger">
        Create Community
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Community
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Name"
                  type="text"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={handleSubmit}>
                  {loading ? <Spinner color="white" /> : "Submit"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
