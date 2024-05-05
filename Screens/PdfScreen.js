import React, { useState,useContext } from 'react';
import { View, Button, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { AuthContext } from '../context/AuthProvider';
import axiosConfig from '../helpers/axiosConfig';


const UploadPDFScreen = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { user } = useContext(AuthContext);

  const pickDocument = async () => {
    try {
      const document = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });
      
      const selectedFileName = document.assets[0].name; // Extract the file name
      setSelectedFile({ ...document, name: selectedFileName }); // Set the file name along with other properties
    } catch (error) {
      console.error('Error picking document: ', error);
    }
  };
  

  const uploadFile = async () => {

    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('pdf_file', selectedFile); // Append the file directly

      
            // Set authentication headers
       axiosConfig.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;


      const response = await axiosConfig.post('/upload-pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload success:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <View>
      <Button title="Select PDF File" onPress={pickDocument} />
      <Button title="Upload File" onPress={uploadFile} disabled={!selectedFile} />
      {selectedFile && (
        <View>
          <Text>Selected PDF: {selectedFile.name}</Text>
          {/* Further operations with the selected PDF */}
        </View>
      )}
    </View>
  );
};

export default UploadPDFScreen;
