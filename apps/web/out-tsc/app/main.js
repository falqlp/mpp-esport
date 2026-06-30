import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { bootstrapApplication } from '@angular/platform-browser';
import { Subject, catchError, combineLatest, map, of, startWith, switchMap, tap } from 'rxjs';
import { EsportsApiService } from './services/esports-api.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/material/button";
import * as i4 from "@angular/material/card";
import * as i5 from "@angular/material/chips";
import * as i6 from "@angular/material/form-field";
import * as i7 from "@angular/material/input";
import * as i8 from "@angular/material/list";
import * as i9 from "@angular/material/select";
import * as i10 from "@angular/material/toolbar";
function AppComponent_main_0_mat_card_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-card", 34)(1, "mat-card-content")(2, "span", 35);
    i0.ɵɵtext(3, "!");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5, "API NestJS indisponible. Lance ");
    i0.ɵɵelementStart(6, "code");
    i0.ɵɵtext(7, "yarn dev:api");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(8, ", puis recharge le front.");
    i0.ɵɵelementEnd()()();
} }
function AppComponent_main_0_mat_option_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 36);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const competition_r2 = ctx.$implicit;
    i0.ɵɵproperty("value", competition_r2.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", competition_r2.label, " ");
} }
function AppComponent_main_0_button_30_img_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 44);
} if (rf & 2) {
    const match_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("src", match_r4.teams[0].logoUrl, i0.ɵɵsanitizeUrl)("alt", match_r4.teams[0].name);
} }
function AppComponent_main_0_button_30_ng_template_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const match_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate(match_r4.teams[0].code);
} }
function AppComponent_main_0_button_30_img_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 44);
} if (rf & 2) {
    const match_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("src", match_r4.teams[1].logoUrl, i0.ɵɵsanitizeUrl)("alt", match_r4.teams[1].name);
} }
function AppComponent_main_0_button_30_ng_template_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const match_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate(match_r4.teams[1].code);
} }
function AppComponent_main_0_button_30_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 37);
    i0.ɵɵlistener("click", function AppComponent_main_0_button_30_Template_button_click_0_listener() { const match_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r4 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r4.selectMatch(match_r4)); });
    i0.ɵɵelementStart(1, "span", 38)(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "small");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "span", 39)(7, "span", 40);
    i0.ɵɵtemplate(8, AppComponent_main_0_button_30_img_8_Template, 1, 2, "img", 41)(9, AppComponent_main_0_button_30_ng_template_9_Template, 1, 1, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span", 42);
    i0.ɵɵtext(12, "VS");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span", 40);
    i0.ɵɵtemplate(14, AppComponent_main_0_button_30_img_14_Template, 1, 2, "img", 41)(15, AppComponent_main_0_button_30_ng_template_15_Template, 1, 1, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "time");
    i0.ɵɵtext(18);
    i0.ɵɵpipe(19, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "span", 43);
    i0.ɵɵtext(21, "\u203A");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const match_r4 = ctx.$implicit;
    const teamACode_r6 = i0.ɵɵreference(10);
    const teamBCode_r7 = i0.ɵɵreference(16);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(match_r4.league);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", match_r4.tournament, " \u00B7 ", match_r4.format);
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("--team-color", match_r4.teams[0].logoColor);
    i0.ɵɵclassProp("has-logo", match_r4.teams[0].logoUrl);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", match_r4.teams[0].logoUrl)("ngIfElse", teamACode_r6);
    i0.ɵɵadvance(5);
    i0.ɵɵstyleProp("--team-color", match_r4.teams[1].logoColor);
    i0.ɵɵclassProp("has-logo", match_r4.teams[1].logoUrl);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", match_r4.teams[1].logoUrl)("ngIfElse", teamBCode_r7);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(19, 16, match_r4.startsAt, "EEE d MMM, HH:mm"));
} }
function AppComponent_main_0_mat_option_51_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 36);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const match_r9 = ctx.$implicit;
    i0.ɵɵproperty("value", match_r9.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", match_r9.teams[0].code, " vs ", match_r9.teams[1].code, " ");
} }
function AppComponent_main_0_div_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 45)(1, "mat-form-field", 21)(2, "mat-label");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "input", 46);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "mat-form-field", 21)(6, "mat-label");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(8, "input", 47);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const match_r10 = ctx.ngIf;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(match_r10.teams[0].name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("max", match_r10.format === "BO1" ? 1 : match_r10.format === "BO3" ? 2 : 3);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(match_r10.teams[1].name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("max", match_r10.format === "BO1" ? 1 : match_r10.format === "BO3" ? 2 : 3);
    i0.ɵɵcontrol();
} }
function AppComponent_main_0_p_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 48);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r4.scoreErrorMessage(), " ");
} }
function AppComponent_main_0_mat_list_item_64_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-list-item")(1, "span", 49);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong", 50);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 51);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const player_r11 = ctx.$implicit;
    const index_r12 = ctx.index;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(index_r12 + 1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(player_r11.playerName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", player_r11.points, " pts");
} }
function AppComponent_main_0_mat_card_72_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-card", 52)(1, "mat-card-subtitle");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "mat-card-title");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "mat-card-content");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const match_r13 = ctx.$implicit;
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(match_r13.league);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate4("", match_r13.teams[0].code, " ", match_r13.result?.score?.[0], " \u2013 ", match_r13.result?.score?.[1], " ", match_r13.teams[1].code);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Vainqueur : ", ctx_r4.teamName(match_r13, match_r13.result?.winnerId ?? ""));
} }
function AppComponent_main_0_mat_card_73_mat_card_header_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-card-header")(1, "mat-card-subtitle", 7);
    i0.ɵɵtext(2, "R\u00E9gions majeures");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "mat-card-title");
    i0.ɵɵtext(4, "\u00C9quipes LCS \u00B7 LEC \u00B7 LCK \u00B7 LPL");
    i0.ɵɵelementEnd()();
} }
function AppComponent_main_0_mat_card_73_mat_card_content_2_article_1_img_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 61);
} if (rf & 2) {
    const team_r14 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("src", team_r14.logoUrl, i0.ɵɵsanitizeUrl)("alt", team_r14.name);
} }
function AppComponent_main_0_mat_card_73_mat_card_content_2_article_1_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const team_r14 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate(team_r14.code);
} }
function AppComponent_main_0_mat_card_73_mat_card_content_2_article_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 58)(1, "span", 59);
    i0.ɵɵtemplate(2, AppComponent_main_0_mat_card_73_mat_card_content_2_article_1_img_2_Template, 1, 2, "img", 60)(3, AppComponent_main_0_mat_card_73_mat_card_content_2_article_1_ng_template_3_Template, 1, 1, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span")(6, "strong");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "small");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const team_r14 = ctx.$implicit;
    const galleryCode_r15 = i0.ɵɵreference(4);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("--team-color", team_r14.logoColor);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", team_r14.logoUrl)("ngIfElse", galleryCode_r15);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(team_r14.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(team_r14.code);
} }
function AppComponent_main_0_mat_card_73_mat_card_content_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-card-content", 56);
    i0.ɵɵtemplate(1, AppComponent_main_0_mat_card_73_mat_card_content_2_article_1_Template, 10, 6, "article", 57);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const teams_r16 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", teams_r16);
} }
function AppComponent_main_0_mat_card_73_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-card", 53);
    i0.ɵɵtemplate(1, AppComponent_main_0_mat_card_73_mat_card_header_1_Template, 5, 0, "mat-card-header", 54)(2, AppComponent_main_0_mat_card_73_mat_card_content_2_Template, 2, 1, "mat-card-content", 55);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const teams_r16 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", teams_r16.length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", teams_r16.length);
} }
function AppComponent_main_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "main", 4)(1, "mat-toolbar", 5)(2, "div", 6)(3, "span", 7);
    i0.ɵɵtext(4, "League of Legends");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h1");
    i0.ɵɵtext(6, "MPP Esport");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(7, "span", 8);
    i0.ɵɵelementStart(8, "mat-chip");
    i0.ɵɵtext(9, "V1 Summer Split");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(10, AppComponent_main_0_mat_card_10_Template, 9, 0, "mat-card", 9);
    i0.ɵɵelementStart(11, "section", 10)(12, "mat-card", 11)(13, "mat-form-field", 12)(14, "mat-label");
    i0.ɵɵtext(15, "Comp\u00E9tition");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "mat-select", 13)(17, "mat-option", 14);
    i0.ɵɵtext(18, "Toutes les comp\u00E9titions");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(19, AppComponent_main_0_mat_option_19_Template, 2, 2, "mat-option", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "mat-card", 16)(21, "mat-card-header")(22, "mat-card-title-group")(23, "mat-card-subtitle", 7);
    i0.ɵɵtext(24, "\u00C0 venir");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "mat-card-title");
    i0.ɵɵtext(26, "Matchs ouverts aux pronos");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "mat-chip");
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(29, "mat-card-content", 17);
    i0.ɵɵtemplate(30, AppComponent_main_0_button_30_Template, 22, 19, "button", 18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(31, "mat-card", 19)(32, "mat-card-header")(33, "mat-card-subtitle", 7);
    i0.ɵɵtext(34, "Prono");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "mat-card-title");
    i0.ɵɵtext(36, "Ton ticket");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(37, "mat-card-content")(38, "form", 20);
    i0.ɵɵlistener("ngSubmit", function AppComponent_main_0_Template_form_ngSubmit_38_listener() { const data_r8 = i0.ɵɵrestoreView(_r1).ngIf; const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.submitPrediction(data_r8.matches)); });
    i0.ɵɵelementStart(39, "mat-form-field", 21)(40, "mat-label");
    i0.ɵɵtext(41, "Pseudo");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(42, "input", 22);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementStart(43, "mat-error");
    i0.ɵɵtext(44, "Entre au moins 2 caract\u00E8res.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(45, "mat-form-field", 21)(46, "mat-label");
    i0.ɵɵtext(47, "Match");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "mat-select", 23)(49, "mat-option", 24);
    i0.ɵɵtext(50, "Choisir un match");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(51, AppComponent_main_0_mat_option_51_Template, 2, 3, "mat-option", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(52, AppComponent_main_0_div_52_Template, 9, 4, "div", 25)(53, AppComponent_main_0_p_53_Template, 2, 1, "p", 26);
    i0.ɵɵelementStart(54, "button", 27);
    i0.ɵɵtext(55, " Valider le prono ");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(56, "mat-card", 28)(57, "mat-card-header")(58, "mat-card-subtitle", 7);
    i0.ɵɵtext(59, "Ligue priv\u00E9e");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(60, "mat-card-title");
    i0.ɵɵtext(61, "Classement");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(62, "mat-card-content")(63, "mat-list", 29);
    i0.ɵɵtemplate(64, AppComponent_main_0_mat_list_item_64_Template, 7, 3, "mat-list-item", 30);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(65, "mat-card", 16)(66, "mat-card-header")(67, "mat-card-subtitle", 7);
    i0.ɵɵtext(68, "R\u00E9sultats");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(69, "mat-card-title");
    i0.ɵɵtext(70, "Matchs termin\u00E9s");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(71, "mat-card-content", 31);
    i0.ɵɵtemplate(72, AppComponent_main_0_mat_card_72_Template, 7, 6, "mat-card", 32);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(73, AppComponent_main_0_mat_card_73_Template, 3, 2, "mat-card", 33);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const data_r8 = ctx.ngIf;
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("ngIf", !data_r8.apiAvailable);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("formControl", ctx_r4.competitionControl);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r4.competitions(data_r8.matches));
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate1("", ctx_r4.filteredMatches(data_r8.upcomingMatches).length, " matchs");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r4.filteredMatches(data_r8.upcomingMatches));
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("formGroup", ctx_r4.form);
    i0.ɵɵadvance(4);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(6);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r4.filteredMatches(data_r8.upcomingMatches));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r4.selectedMatch());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r4.scoreErrorMessage() && (ctx_r4.form.controls.scoreA.dirty || ctx_r4.form.controls.scoreB.dirty || ctx_r4.form.controls.scoreA.touched || ctx_r4.form.controls.scoreB.touched));
    i0.ɵɵadvance(11);
    i0.ɵɵproperty("ngForOf", data_r8.leaderboard);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("ngForOf", ctx_r4.filteredMatches(data_r8.finishedMatches));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r4.majorTeams(data_r8.matches));
} }
export class AppComponent {
    constructor() {
        this.api = inject(EsportsApiService);
        this.fb = inject(FormBuilder);
        this.snackBar = inject(MatSnackBar);
        this.refresh$ = new Subject();
        this.matches = [];
        this.predictions = [];
        this.competitionControl = new FormControl('all', { nonNullable: true });
        this.matchScoreValidator = (control) => {
            const match = this.matches.find((item) => item.id === control.get('matchId')?.value);
            const scoreA = Number(control.get('scoreA')?.value);
            const scoreB = Number(control.get('scoreB')?.value);
            if (!match || !Number.isInteger(scoreA) || !Number.isInteger(scoreB))
                return null;
            const winsRequired = this.winsRequired(match);
            if (scoreA < 0 || scoreB < 0 || scoreA > winsRequired || scoreB > winsRequired) {
                return { scoreOutOfRange: true };
            }
            if (scoreA === scoreB || Math.max(scoreA, scoreB) !== winsRequired) {
                return { invalidSeriesScore: true };
            }
            return null;
        };
        this.form = this.fb.nonNullable.group({
            playerName: ['Leo', [Validators.required, Validators.minLength(2)]],
            matchId: ['', Validators.required],
            scoreA: [2, [Validators.required, Validators.min(0), Validators.max(3)]],
            scoreB: [1, [Validators.required, Validators.min(0), Validators.max(3)]],
        }, { validators: this.matchScoreValidator });
        this.data$ = this.refresh$.pipe(startWith(undefined), switchMap(() => combineLatest({
            matches: this.api.getMatches(),
            leaderboard: this.api.getLeaderboard(),
            predictions: this.api.getPredictions(),
        }).pipe(tap(({ matches, predictions }) => {
            this.matches = matches;
            this.predictions = predictions;
            const matchId = this.form.controls.matchId.value;
            if (matchId)
                this.loadPrediction(matchId);
            this.form.updateValueAndValidity({ emitEvent: false });
        }), map(({ matches, leaderboard, predictions }) => ({
            matches,
            upcomingMatches: matches.filter((match) => match.status === 'upcoming'),
            finishedMatches: matches.filter((match) => match.status === 'finished'),
            leaderboard,
            predictions,
            selectedMatch: matches.find((match) => match.id === this.form.controls.matchId.value),
            apiAvailable: true,
        })), catchError(() => of({
            matches: [],
            upcomingMatches: [],
            finishedMatches: [],
            leaderboard: [],
            predictions: [],
            selectedMatch: undefined,
            apiAvailable: false,
        })))));
        this.form.controls.matchId.valueChanges.subscribe((matchId) => this.loadPrediction(matchId));
        this.form.controls.playerName.valueChanges.subscribe(() => {
            const matchId = this.form.controls.matchId.value;
            if (matchId)
                this.loadPrediction(matchId);
        });
        this.competitionControl.valueChanges.subscribe(() => {
            const selected = this.selectedMatch();
            if (selected && !this.matchesCompetition(selected, this.competitionControl.value)) {
                this.form.controls.matchId.setValue('');
            }
        });
    }
    selectMatch(match) {
        this.form.controls.matchId.setValue(match.id);
        this.loadPrediction(match.id);
    }
    submitPrediction(matches) {
        const value = this.form.getRawValue();
        const match = matches.find((item) => item.id === value.matchId);
        if (!this.form.valid || !match) {
            this.form.markAllAsTouched();
            return;
        }
        this.api.createPrediction({
            matchId: value.matchId,
            playerName: value.playerName,
            score: [Number(value.scoreA), Number(value.scoreB)],
        }).subscribe({
            next: () => {
                this.refresh$.next();
                this.snackBar.open('Pronostic enregistré !', 'Fermer', { duration: 3000 });
            },
            error: () => this.snackBar.open('Le pronostic est invalide.', 'Fermer', { duration: 4000 }),
        });
    }
    selectedMatch() {
        return this.matches.find((match) => match.id === this.form.controls.matchId.value);
    }
    scoreErrorMessage() {
        const match = this.selectedMatch();
        if (!match)
            return '';
        const winsRequired = this.winsRequired(match);
        if (this.form.hasError('scoreOutOfRange')) {
            return `En ${match.format}, une équipe ne peut pas dépasser ${winsRequired} victoire${winsRequired > 1 ? 's' : ''}.`;
        }
        if (this.form.hasError('invalidSeriesScore')) {
            return `Score invalide : le vainqueur doit atteindre ${winsRequired}, sans égalité.`;
        }
        return '';
    }
    teamName(match, teamId) {
        return match.teams.find((team) => team.id === teamId)?.name ?? teamId;
    }
    majorTeams(matches) {
        const majorLeague = /(LCS|LEC|LCK|LPL|LTA|north america|europe|emea|korea|china)/i;
        const teams = new Map();
        for (const match of matches) {
            if (!majorLeague.test(`${match.league} ${match.tournament}`))
                continue;
            for (const team of match.teams)
                teams.set(team.id, team);
        }
        return [...teams.values()].sort((a, b) => a.name.localeCompare(b.name));
    }
    competitions(matches) {
        const competitions = new Map();
        for (const match of matches) {
            const value = this.competitionValue(match);
            competitions.set(value, `${match.league} — ${match.tournament}`);
        }
        return [...competitions.entries()]
            .map(([value, label]) => ({ value, label }))
            .sort((a, b) => a.label.localeCompare(b.label));
    }
    filteredMatches(matches) {
        const competition = this.competitionControl.value;
        return competition === 'all' ? matches : matches.filter((match) => this.matchesCompetition(match, competition));
    }
    loadPrediction(matchId) {
        const match = this.matches.find((item) => item.id === matchId);
        if (!match)
            return;
        const playerName = this.form.controls.playerName.value.trim().toLocaleLowerCase();
        const saved = this.predictions.find((prediction) => prediction.matchId === matchId && prediction.playerName.trim().toLocaleLowerCase() === playerName);
        const winsRequired = this.winsRequired(match);
        this.form.patchValue({
            scoreA: saved?.score[0] ?? winsRequired,
            scoreB: saved?.score[1] ?? Math.max(0, winsRequired - 1),
        }, { emitEvent: false });
        this.form.updateValueAndValidity({ emitEvent: false });
    }
    winsRequired(match) {
        return match.format === 'BO1' ? 1 : match.format === 'BO3' ? 2 : 3;
    }
    competitionValue(match) {
        return `${match.league}|||${match.tournament}`;
    }
    matchesCompetition(match, competition) {
        return competition === 'all' || this.competitionValue(match) === competition;
    }
    static { this.ɵfac = function AppComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AppComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AppComponent, selectors: [["app-root"]], decls: 2, vars: 3, consts: [["teamACode", ""], ["teamBCode", ""], ["galleryCode", ""], ["class", "shell", 4, "ngIf"], [1, "shell"], [1, "topbar"], [1, "brand"], [1, "eyebrow"], [1, "toolbar-spacer"], ["appearance", "outlined", "class", "api-warning", 4, "ngIf"], [1, "grid"], ["appearance", "outlined", 1, "panel", "span-full", "filter-panel"], ["appearance", "outline", "subscriptSizing", "dynamic"], [3, "formControl"], ["value", "all"], [3, "value", 4, "ngFor", "ngForOf"], ["appearance", "outlined", 1, "panel", "span-2"], [1, "match-list"], ["class", "match-row", "type", "button", 3, "click", 4, "ngFor", "ngForOf"], ["appearance", "outlined", 1, "panel", "prediction-panel"], [3, "ngSubmit", "formGroup"], ["appearance", "outline"], ["matInput", "", "type", "text", "formControlName", "playerName", "placeholder", "Ton pseudo"], ["formControlName", "matchId"], ["value", ""], ["class", "score-grid", 4, "ngIf"], ["class", "score-error", 4, "ngIf"], ["mat-flat-button", "", "type", "submit", 1, "primary-action"], ["appearance", "outlined", 1, "panel", "leaderboard-panel"], [1, "leaderboard"], [4, "ngFor", "ngForOf"], [1, "results"], ["appearance", "outlined", 4, "ngFor", "ngForOf"], ["appearance", "outlined", "class", "panel span-full", 4, "ngIf"], ["appearance", "outlined", 1, "api-warning"], ["aria-hidden", "true", 1, "warning-symbol"], [3, "value"], ["type", "button", 1, "match-row", 3, "click"], [1, "league"], [1, "teams"], [1, "team-badge"], [3, "src", "alt", 4, "ngIf", "ngIfElse"], [1, "versus"], ["aria-hidden", "true", 1, "row-arrow"], [3, "src", "alt"], [1, "score-grid"], ["matInput", "", "type", "number", "min", "0", "formControlName", "scoreA", 3, "max"], ["matInput", "", "type", "number", "min", "0", "formControlName", "scoreB", 3, "max"], [1, "score-error"], ["matListItemIcon", "", 1, "rank"], ["matListItemTitle", ""], ["matListItemMeta", ""], ["appearance", "outlined"], ["appearance", "outlined", 1, "panel", "span-full"], [4, "ngIf"], ["class", "team-gallery", 4, "ngIf"], [1, "team-gallery"], ["class", "team-card", 4, "ngFor", "ngForOf"], [1, "team-card"], [1, "team-logo-large"], ["loading", "lazy", 3, "src", "alt", 4, "ngIf", "ngIfElse"], ["loading", "lazy", 3, "src", "alt"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AppComponent_main_0_Template, 74, 12, "main", 3);
            i0.ɵɵpipe(1, "async");
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx.data$));
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, HttpClientModule,
            ReactiveFormsModule, i2.ɵNgNoValidate, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.MinValidator, i2.MaxValidator, i2.FormControlDirective, i2.FormGroupDirective, i2.FormControlName, MatButtonModule, i3.MatButton, MatCardModule, i4.MatCard, i4.MatCardContent, i4.MatCardHeader, i4.MatCardSubtitle, i4.MatCardTitle, i4.MatCardTitleGroup, MatChipsModule, i5.MatChip, MatFormFieldModule, i6.MatFormField, i6.MatLabel, i6.MatError, MatInputModule, i7.MatInput, MatListModule, i8.MatList, i8.MatListItem, i8.MatListItemIcon, i8.MatListItemTitle, i8.MatListItemMeta, MatSelectModule, i9.MatSelect, i9.MatOption, MatSnackBarModule,
            MatToolbarModule, i10.MatToolbar, i1.AsyncPipe, i1.DatePipe], styles: ["[_nghost-%COMP%] { display: block; font-family: Inter, ui-sans-serif, system-ui, sans-serif; min-height: 100vh; }\n.shell[_ngcontent-%COMP%] { margin: 0 auto; max-width: 1180px; padding: 28px 20px 48px; }\n.topbar[_ngcontent-%COMP%] { background: transparent; height: auto; margin-bottom: 24px; padding: 0; }\n.brand[_ngcontent-%COMP%] { display: grid; gap: 2px; }\n.toolbar-spacer[_ngcontent-%COMP%] { flex: 1; }\nh1[_ngcontent-%COMP%] { font-family: inherit; font-size: clamp(34px, 5vw, 58px); font-weight: 850; letter-spacing: -2px; line-height: .95; margin: 0; }\n.eyebrow[_ngcontent-%COMP%] { color: var(--mat-sys-secondary); font-size: 11px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }\n.api-warning[_ngcontent-%COMP%] { background: var(--mat-sys-error-container); margin-bottom: 16px; }\n.api-warning[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] { align-items: center; color: var(--mat-sys-on-error-container); display: flex; gap: 10px; padding: 14px 16px; }\n.warning-symbol[_ngcontent-%COMP%] { align-items: center; background: var(--mat-sys-error); border-radius: 50%; color: var(--mat-sys-on-error); display: inline-flex; flex: 0 0 22px; font-weight: 900; height: 22px; justify-content: center; }\n.grid[_ngcontent-%COMP%] { display: grid; gap: 16px; grid-template-columns: 1.35fr .95fr .85fr; }\n.panel[_ngcontent-%COMP%] { background: color-mix(in srgb, var(--mat-sys-surface-container-low) 94%, transparent); }\n.panel[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] { margin-bottom: 16px; }\n.panel[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] { font-family: inherit; font-size: 21px; font-weight: 800; line-height: 1.2; }\n.span-2[_ngcontent-%COMP%] { grid-column: span 2; }\n.span-full[_ngcontent-%COMP%] { grid-column: 1 / -1; }\n.filter-panel[_ngcontent-%COMP%] { align-items: center; display: flex; justify-content: flex-end; padding: 12px 16px; }\n.filter-panel[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] { max-width: 420px; width: 100%; }\n.match-list[_ngcontent-%COMP%] { display: grid; gap: 10px; }\n.match-row[_ngcontent-%COMP%] { align-items: center; background: var(--mat-sys-surface-container-low); border: 1px solid var(--mat-sys-outline-variant); border-radius: 14px; color: inherit; cursor: pointer; display: grid; font: inherit; gap: 16px; grid-template-columns: minmax(150px, 1.1fr) minmax(150px, 1fr) minmax(120px, auto) 20px; min-height: 78px; overflow: hidden; padding: 10px 14px; text-align: left; width: 100%; }\n.match-row[_ngcontent-%COMP%]:hover { background: var(--mat-sys-secondary-container); border-color: var(--mat-sys-primary); }\n.match-row[_ngcontent-%COMP%]:focus-visible { outline: 3px solid color-mix(in srgb, var(--mat-sys-primary) 35%, transparent); outline-offset: 2px; }\n.league[_ngcontent-%COMP%] { display: grid; gap: 2px; }\n.league[_ngcontent-%COMP%], .league[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .league[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], time[_ngcontent-%COMP%] { min-width: 0; }\n.league[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], time[_ngcontent-%COMP%] { color: var(--mat-sys-on-surface-variant); font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.teams[_ngcontent-%COMP%] { align-items: center; display: flex; gap: 10px; justify-content: center; }\n.team-badge[_ngcontent-%COMP%] { align-items: center; background: var(--team-color); border-radius: 10px; color: #fff; display: inline-flex; font-weight: 900; height: 42px; justify-content: center; min-width: 54px; padding: 0 10px; }\n.team-badge.has-logo[_ngcontent-%COMP%] { background: var(--mat-sys-surface); padding: 4px; }\n.team-badge[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] { height: 34px; object-fit: contain; width: 44px; }\n.versus[_ngcontent-%COMP%] { color: var(--mat-sys-on-surface-variant); font-size: 11px; font-weight: 800; }\n.row-arrow[_ngcontent-%COMP%] { color: var(--mat-sys-primary); font-size: 28px; font-weight: 400; line-height: 1; text-align: right; }\nform[_ngcontent-%COMP%] { display: grid; gap: 4px; }\nmat-form-field[_ngcontent-%COMP%] { width: 100%; }\n.score-grid[_ngcontent-%COMP%] { display: grid; gap: 0; grid-template-columns: 1fr; }\n.score-error[_ngcontent-%COMP%] { color: var(--mat-sys-error); font-size: 12px; line-height: 1.35; margin: -8px 12px 10px; }\n.primary-action[_ngcontent-%COMP%] { min-height: 48px; }\n.leaderboard[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%] { border-bottom: 1px solid var(--mat-sys-outline-variant); }\n.leaderboard[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%]:last-child { border-bottom: 0; }\n.rank[_ngcontent-%COMP%] { align-items: center; background: var(--mat-sys-primary); border-radius: 10px; color: var(--mat-sys-on-primary); display: inline-flex; font-weight: 900; height: 32px; justify-content: center; width: 32px; }\n.results[_ngcontent-%COMP%] { display: grid; gap: 10px; grid-template-columns: repeat(2, minmax(0, 1fr)); }\n.results[_ngcontent-%COMP%]    > mat-card[_ngcontent-%COMP%] { background: var(--mat-sys-surface-container); padding: 14px; }\n.results[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] { color: var(--mat-sys-on-surface-variant); padding: 8px 0 0; }\n.team-gallery[_ngcontent-%COMP%] { display: grid; gap: 10px; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); }\n.team-card[_ngcontent-%COMP%] { align-items: center; background: var(--mat-sys-surface-container); border-radius: 14px; display: flex; gap: 12px; min-width: 0; padding: 10px; }\n.team-card[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:last-child { display: grid; min-width: 0; }\n.team-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.team-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { color: var(--mat-sys-on-surface-variant); }\n.team-logo-large[_ngcontent-%COMP%] { align-items: center; background: var(--mat-sys-surface); border-radius: 12px; display: inline-flex; flex: 0 0 52px; font-weight: 900; height: 52px; justify-content: center; }\n.team-logo-large[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] { height: 44px; object-fit: contain; width: 44px; }\n@media (max-width: 980px) { .grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; } .span-2[_ngcontent-%COMP%] { grid-column: span 1; } }\n@media (max-width: 680px) { .shell[_ngcontent-%COMP%] { padding: 20px 12px 36px; } .topbar[_ngcontent-%COMP%] { align-items: flex-start; gap: 14px; } .match-row[_ngcontent-%COMP%] { gap: 10px; grid-template-columns: 1fr 24px; } .teams[_ngcontent-%COMP%] { justify-content: flex-start; } .match-row[_ngcontent-%COMP%]   time[_ngcontent-%COMP%] { grid-column: 1; } .results[_ngcontent-%COMP%], .score-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; } }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AppComponent, [{
        type: Component,
        args: [{ selector: 'app-root', standalone: true, imports: [
                    CommonModule,
                    HttpClientModule,
                    ReactiveFormsModule,
                    MatButtonModule,
                    MatCardModule,
                    MatChipsModule,
                    MatFormFieldModule,
                    MatInputModule,
                    MatListModule,
                    MatSelectModule,
                    MatSnackBarModule,
                    MatToolbarModule,
                ], template: "<main class=\"shell\" *ngIf=\"data$ | async as data\">\n  <mat-toolbar class=\"topbar\">\n    <div class=\"brand\">\n      <span class=\"eyebrow\">League of Legends</span>\n      <h1>MPP Esport</h1>\n    </div>\n    <span class=\"toolbar-spacer\"></span>\n    <mat-chip>V1 Summer Split</mat-chip>\n  </mat-toolbar>\n\n  <mat-card appearance=\"outlined\" class=\"api-warning\" *ngIf=\"!data.apiAvailable\">\n    <mat-card-content>\n      <span class=\"warning-symbol\" aria-hidden=\"true\">!</span>\n      <span>API NestJS indisponible. Lance <code>yarn dev:api</code>, puis recharge le front.</span>\n    </mat-card-content>\n  </mat-card>\n\n  <section class=\"grid\">\n    <mat-card appearance=\"outlined\" class=\"panel span-full filter-panel\">\n      <mat-form-field appearance=\"outline\" subscriptSizing=\"dynamic\">\n        <mat-label>Comp\u00E9tition</mat-label>\n        <mat-select [formControl]=\"competitionControl\">\n          <mat-option value=\"all\">Toutes les comp\u00E9titions</mat-option>\n          <mat-option *ngFor=\"let competition of competitions(data.matches)\" [value]=\"competition.value\">\n            {{ competition.label }}\n          </mat-option>\n        </mat-select>\n      </mat-form-field>\n    </mat-card>\n\n    <mat-card appearance=\"outlined\" class=\"panel span-2\">\n      <mat-card-header>\n        <mat-card-title-group>\n          <mat-card-subtitle class=\"eyebrow\">\u00C0 venir</mat-card-subtitle>\n          <mat-card-title>Matchs ouverts aux pronos</mat-card-title>\n          <mat-chip>{{ filteredMatches(data.upcomingMatches).length }} matchs</mat-chip>\n        </mat-card-title-group>\n      </mat-card-header>\n      <mat-card-content class=\"match-list\">\n        <button class=\"match-row\" type=\"button\" *ngFor=\"let match of filteredMatches(data.upcomingMatches)\" (click)=\"selectMatch(match)\">\n          <span class=\"league\">\n            <strong>{{ match.league }}</strong>\n            <small>{{ match.tournament }} \u00B7 {{ match.format }}</small>\n          </span>\n          <span class=\"teams\">\n            <span class=\"team-badge\" [class.has-logo]=\"match.teams[0].logoUrl\" [style.--team-color]=\"match.teams[0].logoColor\">\n              <img *ngIf=\"match.teams[0].logoUrl; else teamACode\" [src]=\"match.teams[0].logoUrl\" [alt]=\"match.teams[0].name\">\n              <ng-template #teamACode>{{ match.teams[0].code }}</ng-template>\n            </span>\n            <span class=\"versus\">VS</span>\n            <span class=\"team-badge\" [class.has-logo]=\"match.teams[1].logoUrl\" [style.--team-color]=\"match.teams[1].logoColor\">\n              <img *ngIf=\"match.teams[1].logoUrl; else teamBCode\" [src]=\"match.teams[1].logoUrl\" [alt]=\"match.teams[1].name\">\n              <ng-template #teamBCode>{{ match.teams[1].code }}</ng-template>\n            </span>\n          </span>\n          <time>{{ match.startsAt | date:'EEE d MMM, HH:mm' }}</time>\n          <span class=\"row-arrow\" aria-hidden=\"true\">\u203A</span>\n        </button>\n      </mat-card-content>\n    </mat-card>\n\n    <mat-card appearance=\"outlined\" class=\"panel prediction-panel\">\n      <mat-card-header>\n        <mat-card-subtitle class=\"eyebrow\">Prono</mat-card-subtitle>\n        <mat-card-title>Ton ticket</mat-card-title>\n      </mat-card-header>\n      <mat-card-content>\n        <form [formGroup]=\"form\" (ngSubmit)=\"submitPrediction(data.matches)\">\n          <mat-form-field appearance=\"outline\">\n            <mat-label>Pseudo</mat-label>\n            <input matInput type=\"text\" formControlName=\"playerName\" placeholder=\"Ton pseudo\">\n            <mat-error>Entre au moins 2 caract\u00E8res.</mat-error>\n          </mat-form-field>\n\n          <mat-form-field appearance=\"outline\">\n            <mat-label>Match</mat-label>\n            <mat-select formControlName=\"matchId\">\n              <mat-option value=\"\">Choisir un match</mat-option>\n              <mat-option *ngFor=\"let match of filteredMatches(data.upcomingMatches)\" [value]=\"match.id\">\n                {{ match.teams[0].code }} vs {{ match.teams[1].code }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n\n          <div class=\"score-grid\" *ngIf=\"selectedMatch() as match\">\n            <mat-form-field appearance=\"outline\">\n              <mat-label>{{ match.teams[0].name }}</mat-label>\n              <input matInput type=\"number\" min=\"0\" [max]=\"match.format === 'BO1' ? 1 : match.format === 'BO3' ? 2 : 3\" formControlName=\"scoreA\">\n            </mat-form-field>\n            <mat-form-field appearance=\"outline\">\n              <mat-label>{{ match.teams[1].name }}</mat-label>\n              <input matInput type=\"number\" min=\"0\" [max]=\"match.format === 'BO1' ? 1 : match.format === 'BO3' ? 2 : 3\" formControlName=\"scoreB\">\n            </mat-form-field>\n          </div>\n          <p class=\"score-error\" *ngIf=\"scoreErrorMessage() && (form.controls.scoreA.dirty || form.controls.scoreB.dirty || form.controls.scoreA.touched || form.controls.scoreB.touched)\">\n            {{ scoreErrorMessage() }}\n          </p>\n\n          <button mat-flat-button class=\"primary-action\" type=\"submit\">\n            Valider le prono\n          </button>\n        </form>\n      </mat-card-content>\n    </mat-card>\n\n    <mat-card appearance=\"outlined\" class=\"panel leaderboard-panel\">\n      <mat-card-header>\n        <mat-card-subtitle class=\"eyebrow\">Ligue priv\u00E9e</mat-card-subtitle>\n        <mat-card-title>Classement</mat-card-title>\n      </mat-card-header>\n      <mat-card-content>\n        <mat-list class=\"leaderboard\">\n          <mat-list-item *ngFor=\"let player of data.leaderboard; let index = index\">\n            <span matListItemIcon class=\"rank\">{{ index + 1 }}</span>\n            <strong matListItemTitle>{{ player.playerName }}</strong>\n            <span matListItemMeta>{{ player.points }} pts</span>\n          </mat-list-item>\n        </mat-list>\n      </mat-card-content>\n    </mat-card>\n\n    <mat-card appearance=\"outlined\" class=\"panel span-2\">\n      <mat-card-header>\n        <mat-card-subtitle class=\"eyebrow\">R\u00E9sultats</mat-card-subtitle>\n        <mat-card-title>Matchs termin\u00E9s</mat-card-title>\n      </mat-card-header>\n      <mat-card-content class=\"results\">\n        <mat-card appearance=\"outlined\" *ngFor=\"let match of filteredMatches(data.finishedMatches)\">\n          <mat-card-subtitle>{{ match.league }}</mat-card-subtitle>\n          <mat-card-title>{{ match.teams[0].code }} {{ match.result?.score?.[0] }} \u2013 {{ match.result?.score?.[1] }} {{ match.teams[1].code }}</mat-card-title>\n          <mat-card-content>Vainqueur : {{ teamName(match, match.result?.winnerId ?? '') }}</mat-card-content>\n        </mat-card>\n      </mat-card-content>\n    </mat-card>\n\n    <mat-card appearance=\"outlined\" class=\"panel span-full\" *ngIf=\"majorTeams(data.matches) as teams\">\n      <mat-card-header *ngIf=\"teams.length\">\n        <mat-card-subtitle class=\"eyebrow\">R\u00E9gions majeures</mat-card-subtitle>\n        <mat-card-title>\u00C9quipes LCS \u00B7 LEC \u00B7 LCK \u00B7 LPL</mat-card-title>\n      </mat-card-header>\n      <mat-card-content class=\"team-gallery\" *ngIf=\"teams.length\">\n        <article class=\"team-card\" *ngFor=\"let team of teams\">\n          <span class=\"team-logo-large\" [style.--team-color]=\"team.logoColor\">\n            <img *ngIf=\"team.logoUrl; else galleryCode\" [src]=\"team.logoUrl\" [alt]=\"team.name\" loading=\"lazy\">\n            <ng-template #galleryCode>{{ team.code }}</ng-template>\n          </span>\n          <span>\n            <strong>{{ team.name }}</strong>\n            <small>{{ team.code }}</small>\n          </span>\n        </article>\n      </mat-card-content>\n    </mat-card>\n  </section>\n</main>\n", styles: [":host { display: block; font-family: Inter, ui-sans-serif, system-ui, sans-serif; min-height: 100vh; }\n.shell { margin: 0 auto; max-width: 1180px; padding: 28px 20px 48px; }\n.topbar { background: transparent; height: auto; margin-bottom: 24px; padding: 0; }\n.brand { display: grid; gap: 2px; }\n.toolbar-spacer { flex: 1; }\nh1 { font-family: inherit; font-size: clamp(34px, 5vw, 58px); font-weight: 850; letter-spacing: -2px; line-height: .95; margin: 0; }\n.eyebrow { color: var(--mat-sys-secondary); font-size: 11px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }\n.api-warning { background: var(--mat-sys-error-container); margin-bottom: 16px; }\n.api-warning mat-card-content { align-items: center; color: var(--mat-sys-on-error-container); display: flex; gap: 10px; padding: 14px 16px; }\n.warning-symbol { align-items: center; background: var(--mat-sys-error); border-radius: 50%; color: var(--mat-sys-on-error); display: inline-flex; flex: 0 0 22px; font-weight: 900; height: 22px; justify-content: center; }\n.grid { display: grid; gap: 16px; grid-template-columns: 1.35fr .95fr .85fr; }\n.panel { background: color-mix(in srgb, var(--mat-sys-surface-container-low) 94%, transparent); }\n.panel mat-card-header { margin-bottom: 16px; }\n.panel mat-card-title { font-family: inherit; font-size: 21px; font-weight: 800; line-height: 1.2; }\n.span-2 { grid-column: span 2; }\n.span-full { grid-column: 1 / -1; }\n.filter-panel { align-items: center; display: flex; justify-content: flex-end; padding: 12px 16px; }\n.filter-panel mat-form-field { max-width: 420px; width: 100%; }\n.match-list { display: grid; gap: 10px; }\n.match-row { align-items: center; background: var(--mat-sys-surface-container-low); border: 1px solid var(--mat-sys-outline-variant); border-radius: 14px; color: inherit; cursor: pointer; display: grid; font: inherit; gap: 16px; grid-template-columns: minmax(150px, 1.1fr) minmax(150px, 1fr) minmax(120px, auto) 20px; min-height: 78px; overflow: hidden; padding: 10px 14px; text-align: left; width: 100%; }\n.match-row:hover { background: var(--mat-sys-secondary-container); border-color: var(--mat-sys-primary); }\n.match-row:focus-visible { outline: 3px solid color-mix(in srgb, var(--mat-sys-primary) 35%, transparent); outline-offset: 2px; }\n.league { display: grid; gap: 2px; }\n.league, .league strong, .league small, time { min-width: 0; }\n.league small, time { color: var(--mat-sys-on-surface-variant); font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.teams { align-items: center; display: flex; gap: 10px; justify-content: center; }\n.team-badge { align-items: center; background: var(--team-color); border-radius: 10px; color: #fff; display: inline-flex; font-weight: 900; height: 42px; justify-content: center; min-width: 54px; padding: 0 10px; }\n.team-badge.has-logo { background: var(--mat-sys-surface); padding: 4px; }\n.team-badge img { height: 34px; object-fit: contain; width: 44px; }\n.versus { color: var(--mat-sys-on-surface-variant); font-size: 11px; font-weight: 800; }\n.row-arrow { color: var(--mat-sys-primary); font-size: 28px; font-weight: 400; line-height: 1; text-align: right; }\nform { display: grid; gap: 4px; }\nmat-form-field { width: 100%; }\n.score-grid { display: grid; gap: 0; grid-template-columns: 1fr; }\n.score-error { color: var(--mat-sys-error); font-size: 12px; line-height: 1.35; margin: -8px 12px 10px; }\n.primary-action { min-height: 48px; }\n.leaderboard mat-list-item { border-bottom: 1px solid var(--mat-sys-outline-variant); }\n.leaderboard mat-list-item:last-child { border-bottom: 0; }\n.rank { align-items: center; background: var(--mat-sys-primary); border-radius: 10px; color: var(--mat-sys-on-primary); display: inline-flex; font-weight: 900; height: 32px; justify-content: center; width: 32px; }\n.results { display: grid; gap: 10px; grid-template-columns: repeat(2, minmax(0, 1fr)); }\n.results > mat-card { background: var(--mat-sys-surface-container); padding: 14px; }\n.results mat-card-content { color: var(--mat-sys-on-surface-variant); padding: 8px 0 0; }\n.team-gallery { display: grid; gap: 10px; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); }\n.team-card { align-items: center; background: var(--mat-sys-surface-container); border-radius: 14px; display: flex; gap: 12px; min-width: 0; padding: 10px; }\n.team-card > span:last-child { display: grid; min-width: 0; }\n.team-card strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.team-card small { color: var(--mat-sys-on-surface-variant); }\n.team-logo-large { align-items: center; background: var(--mat-sys-surface); border-radius: 12px; display: inline-flex; flex: 0 0 52px; font-weight: 900; height: 52px; justify-content: center; }\n.team-logo-large img { height: 44px; object-fit: contain; width: 44px; }\n@media (max-width: 980px) { .grid { grid-template-columns: 1fr; } .span-2 { grid-column: span 1; } }\n@media (max-width: 680px) { .shell { padding: 20px 12px 36px; } .topbar { align-items: flex-start; gap: 14px; } .match-row { gap: 10px; grid-template-columns: 1fr 24px; } .teams { justify-content: flex-start; } .match-row time { grid-column: 1; } .results, .score-grid { grid-template-columns: 1fr; } }\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "main.ts", lineNumber: 38 }); })();
bootstrapApplication(AppComponent).catch((error) => console.error(error));
//# sourceMappingURL=main.js.map