import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import StepIndicator from "react-native-step-indicator";
import { Colors } from "../../../config/colors";
import { getCategories } from "../../services/category/categoryService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { uploadProduct } from "../../services/product/productService";
import { useNavigation } from "expo-router";
import { useZustandStore } from "../../store/zustand";

// const categories = [
//   { id: 1, name: 'Voitures' },
//   { id: 2, name: 'Immobilier' },
//   { id: 3, name: 'Électronique' },
//   { id: 4, name: 'Mode' },
// ];
const brands = ["Suzuki", "Toyota", "Renault", "Peugeot", "Hyundai"];
const models = {
  Suzuki: ["Celerio", "Swift", "Vitara", "Baleno"],
  Toyota: ["Corolla", "Yaris", "RAV4", "Hilux"],
  Renault: ["Clio", "Megane", "Captur", "Kadjar"],
  Peugeot: ["208", "308", "3008", "5008"],
  Hyundai: ["i10", "i20", "Tucson", "Santa Fe"],
};
const years = Array.from({ length: 30 }, (_, i) =>
  (new Date().getFullYear() - i).toString()
);
const transactionTypes = [
  { label: "Livraison", value: "0" },
  { label: "Ramasser", value: "1" },
];

export default function ProductForm({ onSubmit, onCancel }) {
  const router = useNavigation();
  const queryClient = useQueryClient();

  const {
    mutate: submitProduct,
    isPending,
    isSuccess,
    error: mutationError,
  } = useMutation({
    mutationFn: uploadProduct,
    onSuccess: () => {
      router.navigate("home");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      ToastAndroid.show(
        "Product Added Successfully",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    },
    onError: (error) => {
      console.error("Upload failed:", error.message);
      if (error.response) {
        console.log("Response error:", error.response.data);
      } else if (error.request) {
        console.log("No response received. Request details:", error.request);
      } else {
        console.log("Something else failed:", error.message);
      }
    },
  });

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Something went wrong!</Text>;
  }
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    images: [],
    brand: "",
    model: "",
    year: "",
    transactionType: "",
  });
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const validateCurrentStep = () => {
    let isValid = true;

    if (currentStep === 0) {
      isValid =
        validateField("name", formData.name) &
        validateField("description", formData.description) &
        validateField("category", formData.category);
    } else if (currentStep === 1) {
      isValid =
        validateField("price", formData.price) &
        validateField("transactionType", formData.transactionType);
    } else if (currentStep === 2) {
      if (!formData.images || formData.images.length === 0) {
        ToastAndroid.show(
          "Veuillez ajouter au moins une image",
          ToastAndroid.SHORT
        );
        isValid = false;
      }
    }

    return Boolean(isValid);
  };
  // Validation Function
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value) error = "Le nom est requis";
        else if (value.length < 3)
          error = "Le nom doit contenir au moins 3 caractères";
        break;
      case "description":
        if (!value) error = "La description est requise";
        break;
      case "price":
        if (!value) error = "Le prix est requis";
        else if (isNaN(value) || parseFloat(value) <= 0)
          error = "Le prix doit être un nombre positif";
        break;
      case "category":
        if (!value) error = "La catégorie est requise";
        break;
      // case "brand":
      //   if (!value) error = "La marque est requise";
      //   break;
      // case "model":
      //   if (!value) error = "Le modèle est requis";
      //   break;
      // case "year":
      //   if (!value) error = "L'année est requise";
      //   break;
      case "transactionType":
        if (!value) error = "Le type de transaction est requis";
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
    return !error;
  };

  // Handle Input Changes
  const handleChange = (name, value) => {
    if (name === "category") {
      const selectedCategory = categories.find((cat) => cat.id === value);
      setFormData((prev) => ({ ...prev, category: selectedCategory }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    validateField(name, value);
    // Reset model when brand changes
    if (name === "brand") {
      setFormData((prev) => ({ ...prev, model: "" }));
    }
  };

  // Image Picker Functionality
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultiple: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...result.assets.map((asset) => asset.uri)],
      }));
    }
  };
  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    if (!validateCurrentStep()) return;

    const form = new FormData();

    const product = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price || "0"),
      stock: parseInt(formData.stock || "0"),

      category: {
        id: formData.category?.id,
        name: formData.category?.name,
      },
      deliveryMethod: formData.transactionType,
    };
    formData.images.forEach((uri, index) => {
      form.append("files", {
        uri,
        type: "image/jpeg",
        name: `image${index}.jpg`,
      });
    });
    form.append("product", {
      uri: `data:application/json;base64,${btoa(JSON.stringify(product))}`,
      type: "application/json",
      name: "product.json",
    });
    submitProduct(form);
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Step Indicator Labels
  const labels = ["Informations", "Détails", "Critères"];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: Colors.primary,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: Colors.primary,
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: Colors.primary,
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: Colors.primary,
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: Colors.primary,
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: "#ffffff",
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: Colors.primary,
  };

  return (
    <ScrollView style={styles.container}>
      {/* Step Indicator */}
      <View style={styles.stepContainer}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentStep}
          stepCount={3}
          labels={labels}
        />
      </View>

      {/* Image Upload Section - Always Visible */}

      {/* Step 1 Content */}
      {currentStep === 0 && (
        <>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Titre de l'annonce</Text>
            <TextInput
              style={styles.input}
              placeholder="Entrez le titre de l'annonce"
              value={formData.name}
              onChangeText={(value) => handleChange("name", value)}
            />
            {errors.name && <Text style={styles.error}>{errors.name}</Text>}
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Décrivez votre annonce"
              multiline
              numberOfLines={4}
              value={formData.description}
              onChangeText={(value) => handleChange("description", value)}
            />
            {errors.description && (
              <Text style={styles.error}>{errors.description}</Text>
            )}
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Catégorie</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.category}
                onValueChange={(value) => handleChange("category", value)}
                style={styles.picker}
              >
                <Picker.Item
                  label="Choisir la catégorie de l'annonce"
                  value=""
                />
                {categories.map((category) => (
                  <Picker.Item
                    key={category.id}
                    label={category.name}
                    value={category.id}
                  />
                ))}
              </Picker>
            </View>
            {errors.category && (
              <Text style={styles.error}>{errors.category}</Text>
            )}
          </View>
        </>
      )}

      {/* Step 2 Details */}
      {currentStep === 1 && (
        <>
          {/* <View style={styles.formGroup}>
            <Text style={styles.label}>Marque de voiture</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.brand}
                onValueChange={(value) => handleChange("brand", value)}
                style={styles.picker}
              >
                <Picker.Item label="Sélectionnez une marque" value="" />
                {brands.map((brand) => (
                  <Picker.Item key={brand} label={brand} value={brand} />
                ))}
              </Picker>
            </View>
            {errors.brand && <Text style={styles.error}>{errors.brand}</Text>}
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Modèle</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.model}
                onValueChange={(value) => handleChange("model", value)}
                style={styles.picker}
                enabled={!!formData.brand}
              >
                <Picker.Item label="Sélectionnez un modèle" value="" />
                {formData.brand &&
                  models[formData.brand]?.map((model) => (
                    <Picker.Item key={model} label={model} value={model} />
                  ))}
              </Picker>
            </View>
            {errors.model && <Text style={styles.error}>{errors.model}</Text>}
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Année</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.year}
                onValueChange={(value) => handleChange("year", value)}
                style={styles.picker}
              >
                <Picker.Item label="Sélectionnez une année" value="" />
                {years.map((year) => (
                  <Picker.Item key={year} label={year} value={year} />
                ))}
              </Picker>
            </View>
            {errors.year && <Text style={styles.error}>{errors.year}</Text>}
          </View> */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Type de livraison</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.transactionType}
                onValueChange={(value) =>
                  handleChange("transactionType", value)
                }
                style={styles.picker}
              >
                <Picker.Item label="Sélectionnez un type" value="" />
                {transactionTypes.map((type) => (
                  <Picker.Item
                    key={type.value}
                    label={type.label}
                    value={type.value}
                  />
                ))}
              </Picker>
            </View>
            {errors.transactionType && (
              <Text style={styles.error}>{errors.transactionType}</Text>
            )}
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Prix (TND)</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.currency}>TND</Text>
              <TextInput
                style={styles.priceInput}
                placeholder="0.00"
                keyboardType="decimal-pad"
                value={formData.price}
                onChangeText={(value) => handleChange("price", value)}
              />
            </View>
            {errors.price && <Text style={styles.error}>{errors.price}</Text>}
          </View>
        </>
      )}

      {/* Step 3 others */}
      {currentStep === 2 && (
        <>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Ajouter des images d'annonce</Text>
            <TouchableOpacity style={styles.imageUploader} onPress={pickImage}>
              <Text style={styles.uploaderText}>+ Ajouter une image</Text>
            </TouchableOpacity>
            <View style={styles.imagePreviewContainer}>
              {formData.images.map((uri, index) => (
                <View key={index} style={styles.imageWrapper}>
                  <Image source={{ uri }} style={styles.imagePreview} />
                  <TouchableOpacity
                    style={styles.removeImageButton}
                    onPress={() => removeImage(index)}
                  >
                    <Text style={styles.removeImageText}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </>
      )}

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        {currentStep > 0 ? (
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={prevStep}
          >
            <Text style={styles.buttonText}>Précédent</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onCancel}
          >
            <Text style={styles.buttonText}>Annuler</Text>
          </TouchableOpacity>
        )}
        {currentStep < 2 ? (
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={nextStep}
          >
            <Text style={[styles.buttonText, styles.primaryButtonText]}>
              Suivant
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={handleSubmit}
          >
            <Text style={[styles.buttonText, styles.primaryButtonText]}>
              Publier
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  stepContainer: {
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: Colors.text,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  currency: {
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#757575",
  },
  priceInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    overflow: "hidden",
  },
  picker: {
    height: 50,
  },
  imageUploader: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderStyle: "dashed",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  uploaderText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  imagePreviewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    gap: 10,
  },
  imageWrapper: {
    position: "relative",
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeImageButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  removeImageText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 18,
  },
  error: {
    color: "#FF3B30",
    fontSize: 14,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#F5F5F5",
  },
  secondaryButton: {
    backgroundColor: "#F5F5F5",
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryButtonText: {
    color: "#FFFFFF",
  },
});
