# 🅿️ PARKly - Slot Allocation Visual Guide

## 📋 New Slot Allocation Layout

```
┌─────────────────────────────────────────────────────────────┐
│                    PARKING LOT LAYOUT                      │
│                      (5x5 Grid)                            │
└─────────────────────────────────────────────────────────────┘

🚗 ROW 1 & 2: 4-WHEELER ZONE (Slots 1-10)
┌─────┬─────┬─────┬─────┬─────┐
│  1  │  2  │  3  │  4  │  5  │  ← Row 1: 4-Wheeler Only
├─────┼─────┼─────┼─────┼─────┤
│  6  │  7  │  8  │  9  │ 10  │  ← Row 2: 4-Wheeler Only
├─────┼─────┼─────┼─────┼─────┤
│ 11  │ 12  │ 13  │ 14  │ 15  │  ← Row 3: 2-Wheeler Only
├─────┼─────┼─────┼─────┼─────┤
│ 16  │ 17  │ 18  │ 19  │ 20  │  ← Row 4: 2-Wheeler Only
├─────┼─────┼─────┼─────┼─────┤
│ 21⚡│ 22⚡│ 23⚡│ 24⚡│ 25⚡│  ← Row 5: EV Only
└─────┴─────┴─────┴─────┴─────┘
🏍️ ROW 3 & 4: 2-WHEELER ZONE (Slots 11-20)

⚡ ROW 5: EV ZONE
   • Slots 21-23: 2-Wheeler EV Only
   • Slots 24-25: 4-Wheeler EV Only
```

## 🎯 Vehicle Type Access Matrix

| Vehicle Type | Available Slots | Restricted Slots | Special Notes |
|--------------|----------------|------------------|---------------|
| **🚗 4-Wheeler (Non-EV)** | 1-10 | 11-25 | Rows 1-2 only |
| **🏍️ 2-Wheeler (Non-EV)** | 11-20 | 1-10, 21-25 | Rows 3-4 only |
| **⚡🚗 4-Wheeler EV** | 1-10, 24-25 | 11-23 | Regular + EV slots |
| **⚡🏍️ 2-Wheeler EV** | 11-23 | 1-10, 24-25 | Regular + EV slots |

## 🎨 Visual Indicators

### Slot Colors & Icons
- 🟢 **Green**: Available for your vehicle type
- 🔴 **Red/Gray**: Restricted (not available)
- ⚡ **Blue with Lightning**: EV-preferred slots
- 🚫 **Crossed**: Completely restricted

### Row Labels
- 🚗 **Green Badge**: Available for 4-wheelers
- 🏍️ **Green Badge**: Available for 2-wheelers
- 🔴 **Red Badge**: Restricted area
- ⚡ **Blue Badge**: EV-only area

## 📱 User Experience Flow

### 1. Registration Phase
```
User selects: Vehicle Type + EV Status
↓
System determines: Available slot range
```

### 2. Booking Phase
```
Display: Color-coded parking grid
Show: Row labels with restrictions
Highlight: Available slots for user's vehicle type
```

### 3. Selection Phase
```
✅ Click available slot → Select and highlight
❌ Click restricted slot → Show specific error message
```

## 🚨 Error Messages by Vehicle Type

### 4-Wheeler (Non-EV)
- **Slots 11-20**: "This slot is reserved for 2-wheelers. 4-wheelers can only use slots 1-10."
- **Slots 21-25**: "This slot is reserved for EV vehicles. 4-wheelers can only use slots 1-10."

### 2-Wheeler (Non-EV)
- **Slots 1-10**: "This slot is reserved for 4-wheelers. 2-wheelers can only use slots 11-20."
- **Slots 21-25**: "This slot is reserved for EV vehicles. 2-wheelers can only use slots 11-20."

### 4-Wheeler EV
- **Slots 11-20**: "This slot is reserved for 2-wheelers. 4-Wheeler EVs can use slots 1-10 & 24-25."
- **Slots 21-23**: "This slot is reserved for 2-Wheeler EVs. 4-Wheeler EVs can use slots 1-10 & 24-25."

### 2-Wheeler EV
- **Slots 1-10**: "This slot is reserved for 4-wheelers. 2-Wheeler EVs can use slots 11-23."
- **Slots 24-25**: "This slot is reserved for 4-Wheeler EVs. 2-Wheeler EVs can use slots 11-23."

## ✨ Benefits of New System

1. **🎯 Clear Segregation**: Each vehicle type has dedicated areas
2. **⚡ EV Priority**: Special slots for electric vehicles
3. **📊 Better Utilization**: Optimized space allocation
4. **🚫 Conflict Prevention**: No mixing of incompatible vehicle types
5. **👥 User Guidance**: Clear visual and textual indicators
6. **🔄 Flexible for EVs**: Electric vehicles get additional options

## 🔧 Technical Implementation

- **Dynamic Slot Generation**: Based on user's vehicle type and EV status
- **Real-time Validation**: Prevents booking in restricted areas
- **Visual Feedback**: Immediate color coding and icons
- **Responsive Design**: Works on all device sizes
- **Accessibility**: ARIA labels and keyboard navigation support