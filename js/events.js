function isGoldEvent(summary) {
    lowerText = summary.toLowerCase();
    if (lowerText.includes("gold")) {
        return true;
    }
    return false;
}

function isXPEvent(summary) {
    lowerText = summary.toLowerCase();
    if (lowerText.includes("experi") || summary.includes("XP")) {
        return true;
    }
    return false;
}

function isMushroomEvent(summary) {
    lowerText = summary.toLowerCase();
    if (lowerText.includes("mushroom")) {
        return true;
    }
    return false;
}

function isAnyEpicEvent(summary) {
    lowerText = summary.toLowerCase();
    if (lowerText.includes("epic")) {
        return true;
    }
    return false;
}

function isEpicThirstEvent(summary) {
    lowerText = summary.toLowerCase();
    if (lowerText.includes("epic") && (lowerText.includes("thirst") || lowerText.includes("quest"))) {
        return true;
    }
    return false;
}

function isEpicLuckEvent(summary) {
    lowerText = summary.toLowerCase();
    if (lowerText.includes("epic") && lowerText.includes("luck")) {
        return true;
    }
    return false;
}

function isEpicShopEvent(summary) {
    lowerText = summary.toLowerCase();
    if (lowerText.includes("epic") && lowerText.includes("shop")) {
        return true;
    }
    return false;
}

function isToiletEvent(summary) {
    lowerText = summary.toLowerCase();
    if (lowerText.includes("toilet") || lowerText.includes("aura")) {
        return true;
    }
    return false;
}

function isHourglassEvent(summary) {
    lowerText = summary.toLowerCase();
    if (lowerText.includes("hourglass")) {
        return true;
    }
    return false;
}

function isFruitsEvent(summary) {
    lowerText = summary.toLowerCase();
    if (lowerText.includes("animal") || lowerText.includes("fruit")) {
        return true;
    }
    return false;
}

function isBlacksmithEvent(summary) {
    lowerText = summary.toLowerCase();
    if (lowerText.includes("blacksmith") || lowerText.includes("splinter") || lowerText.includes("metal")) {
        return true;
    }
    return false;
}

function isSoulsEvent(summary) {
    lowerText = summary.toLowerCase();
    if (lowerText.includes("soul") || lowerText.includes("underworld")) {
        return true;
    }
    return false;
}

function isFortressEvent(summary) {
    lowerText = summary.toLowerCase();
    if (lowerText.includes("fortress") || lowerText.includes("wood") || lowerText.includes("stone") || lowerText.includes("forest")) {
        return true;
    }
    return false;
}

function isMultiEvent(summary) {
    lowerText = summary.toLowerCase();
    if (isGoldEvent(summary) && isXPEvent(summary) && isMushroomEvent(summary)) {
        return true;
    }
    return false;
}

function eventClass(summary) {
    if (isGoldEvent(summary)) {
        return "gold";
    }
    if (isMushroomEvent(summary)) {
        return "mushrooms";
    }
    if (isHourglassEvent(summary)) {
        return "hourglasses";
    }
    if (isToiletEvent(summary)) {
        return "aura";
    }
    if (isFruitsEvent(summary)) {
        return "animals";
    }
    if (isEpicThirstEvent(summary)) {
        return "epic-thirst";
    }
    if (isEpicLuckEvent(summary)) {
        return "epic-luck";
    }
    if (isEpicShopEvent(summary)) {
        return "epic-shops";
    }
    if (isAnyEpicEvent(summary)) {
        return "epic";
    }
    if (isBlacksmithEvent(summary)) {
        return "blacksmith";
    }
    if (isSoulsEvent(summary)) {
        return "souls";
    }
    if (isFortressEvent(summary)) {
        return "fortress";
    }
    if (isXPEvent(summary)) {
        return "xp";
    }
    return "";
}

function mainEventBgColor(summary) {
    if (isMultiEvent(summary)) {
        return "#f57f17";
    }
    if (isGoldEvent(summary)) {
        return "#F9A825";
    }
    if (isMushroomEvent(summary)) {
        return "#d84315";
    }
    if (isAnyEpicEvent(summary)) {
        return "#6A1B9A";
    }
    if (isXPEvent(summary)) {
        return "#0D47A1";
    }

    // If not a secondary event, then it is some kind of special event
    if ((isHourglassEvent(summary) || isToiletEvent(summary) || isFruitsEvent(summary)) || isBlacksmithEvent(summary) || isSoulsEvent(summary) || isFortressEvent(summary)) {
        return "";
    }
    
    return "#3788d8";
}

function mainEventTextColor(summary) {
    if (mainEventBgColor(summary))
    {
        return "#ffffff";
    }
    return "";
}

function eventOrder(summary) {
    if (isMultiEvent(summary)) {
        return 0;
    }
    if (isGoldEvent(summary) || isXPEvent(summary)) {
        return 1;
    }
    if (isMushroomEvent(summary)) {
        return 2;
    }
    if (isEpicShopEvent(summary)) {
        return 3;
    }
    if (isAnyEpicEvent(summary)) {
        return 4;
    }
    if (isFortressEvent(summary)) {
        return 5;
    }
    if (isBlacksmithEvent(summary)) {
        return 6;
    }
    if (isToiletEvent(summary)) {
        return 7;
    }
    if (isSoulsEvent(summary)) {
        return 8;
    }
    if (isHourglassEvent(summary)) {
        return 9;
    }
    if (isFruitsEvent(summary)) {
        return 10;
    }
    return 100;
}
